const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  industry: { type: String },
  year: { type: Number },
  revenue: { type: String },
  website: { type: String },

  sections: [
    {
      heading: { type: String, required: true },
      content: [{ type: String }],
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

const CaseStudy =
  mongoose.models.CaseStudy || mongoose.model("CaseStudy", caseStudySchema);
module.exports = CaseStudy;
