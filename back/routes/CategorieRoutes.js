const express = require("express");
const Categorie = require("../models/Categorie");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const newCategorie = new Categorie(req.body);
    await newCategorie.save();
    res.status(201).json(newCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET CATEGORIE BY ID
router.get("/:id", async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie)
      return res.status(404).json({ message: "Categorie non trouver" });
    res.status(200).json(categorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCategorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCategorie)
      return res.status(404).json({ message: "Categorie non trouver" });
    res.status(200).json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!deletedCategorie)
      return res.status(404).json({ message: "Categorie non trouver " });
    res.status(200).json({ message: "Categorie supprimer avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
