const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema({
  count: Number,
  date: {
    type: String,
    default: new Date(),
  },
});

// Define model
module.exports = mongoose.model("Visitor", visitorSchema);
