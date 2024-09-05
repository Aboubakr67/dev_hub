const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Category = require("../models/Categorie");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// Lire le fichier JSON
const categoriesPath = path.join(__dirname, "CategoriesTest.json");
const categories = JSON.parse(fs.readFileSync(categoriesPath, "utf8"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connecté à la base de données");

    return Category.insertMany(categories);
  })
  .then(() => {
    console.log("Catégories insérées avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de l'insertion des catégories", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
