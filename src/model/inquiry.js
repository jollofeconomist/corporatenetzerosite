const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Inquiry =
  mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
module.exports = Inquiry;
