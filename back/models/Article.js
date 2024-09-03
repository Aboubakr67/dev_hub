const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie",
        required: true,
      },
    ],
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
