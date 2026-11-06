
const express = require("express");
const net = require("node:net");
const rateLimit = require("express-rate-limit");

// const VisitorLog = require("../model/visitor-model");
const Visitor = require("../model/visitor-model");

const router = express.Router();

const ALLOWED_ORIGINS = new Set([
    "https://www.brajalal.com",
    "https://brajalal.com",
    "http://127.0.0.1:5500",
]);

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

router.use(limiter);

router.use((req, res, next) => {
  const origin = req.get("origin");

  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader(
      "Access-Control-Allow-Origin",
      origin
    );
    res.setHeader(
      "Vary",
      "Origin"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type"
    );
  }

  if (req.method === "OPTIONS") {    
    return res.sendStatus(
      ALLOWED_ORIGINS.has(origin) ? 204 : 403
    );
  }

  next();
});


router.post("/visit", async (req, res) => {
    const origin = req.get("origin");
    
    if (!ALLOWED_ORIGINS.has(origin)) {
        return res.status(403).json({
            error: "Forbidden",
        });
    }
    
    const { path, referrer, event } = req.body || {};   
    
    const clientIP_1 = req.get("true-client-ip");
    console.log("Visitor IP (via get):", clientIP_1);

    const clientIP_2 = req.headers["true-client-ip"];
    console.log("Visitor IP accessed via headers:", clientIP_2);
    
    // Requires correctly configured Express trust proxy.
    // const ip = req.ip;

    // console.log("******************req.ip***************:", req.ip);
    
    // if (!net.isIP(ip)) {
    //     return res.status(400).json({
    //         error: "Unable to determine client IP",
    //     }).end();
    // }

    try {
        // Use a fixed, trusted API hostname.
        const geoUrl = new URL(process.env.GEO_API_URL);
        
        if (geoUrl.protocol !== "https:") {
            throw new Error("Geo API requires HTTPS");
        }

        // API key is passed as a query parameter.
        geoUrl.searchParams.set(
            "api_key",
            process.env.GEO_API_KEY
        );

        // Example provider contract:
        // GET /lookup?ip=x.x.x.x
        geoUrl.searchParams.set("ip_address", clientIP_1 || clientIP_2);

        console.log("******************geoUrl***************:", geoUrl.toString());
        
        const geoResponse = await fetch(geoUrl, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
            redirect: "error",
            signal: AbortSignal.timeout(4000),
        });

        if (!geoResponse.ok) {
            throw new Error(
                `Geo API HTTP ${geoResponse.status}`
            );
        }

        const geo = await geoResponse.json();

        console.log("******************geo***************:", geo);
        
        
        let referrerHost = "direct";

        if (referrer) {
            try {
                const url = new URL(referrer);
                if (["http:", "https:"].includes(url.protocol)) {
                    referrerHost = url.hostname.slice(0, 120);
                }
            } catch {
                // Ignore malformed referrer.
            }
        }

        // Adapt these fields to your Geo API's response.
        const limit = (value, max = 120) =>
            typeof value === "string"
                ? value.slice(0, max)
                : "";

        const newVisitor = new Visitor({
            ...geo, path,
            referrerHost,
            event
        });

        newVisitor
            .save()
            .then((value) => {   
                console.log("Visitor data saved:");             
                return res.status(201);
            })
            .catch((err) => {                
                return res.status(201).json({
                    status: "failed",
                    message: "Data insertion failed",
                });
            });

        return res.status(204).end();
    } catch (err) {
        console.error("Visitor tracking failed:", err.message);

        return res.status(503).json({
            error: "Tracking temporarily unavailable",
        });
    }
});

module.exports = router;
