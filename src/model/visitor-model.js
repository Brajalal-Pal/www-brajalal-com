const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema(
  {
    ip_address: { type: String },
    location: {
      city: { type: String },
      city_geoname_id: { type: String },
      region: { type: String },
      region_iso_code: { type: String },
      region_geoname_id: { type: String },
      postal_code: { type: String },
      country: { type: String },
      country_code: { type: String },
      country_geoname_id: { type: String },
      country_is_eu: { type: String },
      continent: { type: String },
      continent_code: { type: String },
      continent_geoname_id: { type: String },
      longitude: { type: String },
      latitude: { type: String },
    },
    security: {
      is_vpn: { type: Boolean },
      is_proxy: { type: Boolean },
    },
    asn: {
      asn: { type: Number },
      name: { type: String },      
      domain: { type: String },
      type: { type: String },
    },
    company: {
      name: { type: String },
      domain: { type: String },
      type: { type: String },
    },
    domain: {
      domains: [String],
    },
    timezone: {
      name: { type: String },
      abbreviation: { type: String },
      gmt_offset: { type: String },
      current_time: { type: String },
      is_dst: { type: Boolean },
    },
    flag: {
      emoji: { type: String },
      unicode: { type: String },
      png: { type: String },
      svg: { type: String },
    },
    currency: {
      name: { type: String },
      code: { type: String },
      symbol: { type: String },
    },
    connection: {
      autonomous_system_number: { type: Number },
      autonomous_system_organization: { type: String },
      connection_type: { type: String },
      isp_name: { type: String },
      organization_name: { type: String },
    },
    path: String,
    referrerHost: String,
    event: String,
  },
  { timestamps: true }
);

// Define model
module.exports = mongoose.model("Visitor", visitorSchema);
