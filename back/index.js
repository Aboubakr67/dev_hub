const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database.js");

const articleRoutes = require("./routes/ArticleRoutes.js");
const categorieRoutes = require("./routes/CategorieRoutes.js");

require("dotenv").config();
const app = express();

app.use(express.json()); // Middleware pour parser le JSON
// L'url du serveur web (react js)
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

connectDB();

// LES ROUTES
app.use("/api/articles", articleRoutes);
app.use("/api/categories", categorieRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
