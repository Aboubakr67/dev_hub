const mongoose = require("mongoose");

const CategorieSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    image: {
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

const Categorie = mongoose.model("Categorie", CategorieSchema);
module.exports = Categorie;
