require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectToDB = require("./src/config/db");
const visitorRouter = require("./src/router/visitor-router");

const app = express();
const PORT = process.env.PORT || 5001;

//console.log(process.env.CLIENT);

app.use(
  cors({
    origin: process.env.CLIENT,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const visitors = { count: 0 };

// app.get("/", (req, res) => {
//   visitors.count = visitors.count + 1;
//   res.status(200).json(visitors);
// });

app.use("/", visitorRouter);

app.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
