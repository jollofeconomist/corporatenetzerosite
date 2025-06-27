const mongoose = require("mongoose");

const newsschema = new mongoose.Schema({
  title: {
    type: String,
  },

  info: {
    type: String,
  },
  content: {
    type: [String],
    required: true,
  },
  sourceUrl: {
    type: String,
  },
});

const News = mongoose.models.News || mongoose.model("news", newsschema);

module.exports = News;
