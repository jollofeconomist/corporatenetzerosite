const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admins",
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
module.exports = Admin;
