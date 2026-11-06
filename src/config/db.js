const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
