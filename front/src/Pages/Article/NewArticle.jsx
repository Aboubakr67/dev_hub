import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Pour les notifications
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewArticle = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !username ||
      !title ||
      !description ||
      selectedCategories.length === 0
    ) {
      setError("Tous les champs sont obligatoires !");
      return;
    }

    const articleData = {
      username,
      title,
      description,
      categories: selectedCategories,
    };

    try {
      await axios.post("http://localhost:5000/api/articles", articleData);

      toast.success("Article créé avec succès !", {
        position: "bottom-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);

      setUsername("");
      setTitle("");
      setDescription("");
      setSelectedCategories([]);
      setError("");
    } catch (err) {
      console.error("Erreur lors de la création de l'article", err);
      setError("Une erreur s'est produite lors de la création de l'article.");

      toast.error("Erreur lors de la création de l'article", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2>Créer un nouvel article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Titre de l'article</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sélectionner des catégories</label>
          <div className="d-flex flex-wrap">
            {categories.map((categorie) => (
              <div key={categorie._id} className="form-check m-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={categorie._id}
                  checked={selectedCategories.includes(categorie._id)}
                  onChange={() => handleCategoryChange(categorie._id)}
                />
                <label className="form-check-label" htmlFor={categorie._id}>
                  <img
                    src={categorie.image}
                    alt={categorie.nom}
                    style={{ width: "30px", marginRight: "10px" }}
                  />
                  {categorie.nom}
                </label>
              </div>
            ))}
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Créer l'article
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
