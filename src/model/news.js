const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
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

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

module.exports = News;
