const express = require("express");
const Article = require("../models/Article");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().populate("categories");
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ARTICLE BY ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "categories"
    );
    if (!article)
      return res.status(404).json({ message: "Article non trouver" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle)
      return res.status(404).json({ message: "Article non trouver" });
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle)
      return res.status(404).json({ message: "Article non trouver" });
    res.status(200).json({ message: "Article supprimer avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
