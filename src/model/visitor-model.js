const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitorSchema = new Schema(
  {
    // status: { type: String },
    // country: { type: String },
    // countryCode: { type: String },
    // region: { type: String },
    // regionName: { type: String },
    // city: { type: String },
    // zip: { type: String },
    // lat: { type: String },
    // lon: { type: String },
    // timezone: { type: String },
    // isp: { type: String },
    // org: { type: String },
    // as: { type: String },
    // query: { type: String },
    ip_address: { type: String },
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
    security: {
      is_vpn: { type: Boolean },
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
      currency_name: { type: String },
      currency_code: { type: String },
    },
    connection: {
      autonomous_system_number: { type: Number },
      autonomous_system_organization: { type: String },
      connection_type: { type: String },
      isp_name: { type: String },
      organization_name: { type: String },
    },
  },
  { timestamps: true }
);

// Define model
module.exports = mongoose.model("Visitor", visitorSchema);
