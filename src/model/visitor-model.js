const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema(
  {
    status: { type: String },
    country: { type: String },
    countryCode: { type: String },
    region: { type: String },
    regionName: { type: String },
    city: { type: String },
    zip: { type: String },
    lat: { type: String },
    lon: { type: String },
    timezone: { type: String },
    isp: { type: String },
    org: { type: String },
    as: { type: String },
    query: { type: String },
  },
  { timestamps: true }
);

// Define model
module.exports = mongoose.model("Visitor", visitorSchema);
