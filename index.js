require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectToDB = require("./src/config/db");
// const visitorRouter = require("./src/router/visitor-router");
const visitRouter = require("./src/router/visit");

const app = express();
const PORT = process.env.SERVER_PORT || 8000;

//console.log(process.env.CLIENT);

// IMPORTANT: configure to match your actual
// trusted Render reverse-proxy topology.
// Do not blindly use "trust proxy: true".
app.set("trust proxy", 1);

// app.use(
//   cors({
//     origin: process.env.CLIENT,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     credentials: true,
//   })
// );

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.json({ limit: "2kb" }));

app.use("/api/v1", visitRouter);

// const visitors = { count: 0 };

// app.get("/", (req, res) => {
//   visitors.count = visitors.count + 1;
//   res.status(200).json(visitors);
// });

// app.use(visitorRouter); // older implementation, can be removed after testing the new implementation

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
