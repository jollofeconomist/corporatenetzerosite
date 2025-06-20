const mongoose = require("mongoose");

const dataschema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
      index: true,
    },
    country: {
      type: String,
      required: true,
      index: true,
    },
    continent: {
      type: String,
      enum: [
        "Asia",
        "Europe",
        "North America",
        "South America",
        "Africa",
        "Oceania",
        "Australia",
      ],

      required: true,
    },
    netzero: {
      type: Boolean,
      required: true,
    },
    targetyear: {
      type: Number,
    },
    companyyearrevenue: {
      type: Number,
    },
    scope: {
      type: String,
      enum: ["1", "2", "3"],
      required: false,
    },
    sciencebasedtargets: {
      type: String,
      enum: ["Yes", "No", "Removed"],
    },
  },
  {
    collection: "alldata",
    timestamps: true,
  }
);

const Data = mongoose.models.Data || mongoose.model("Data", dataschema);
module.exports = Data;
