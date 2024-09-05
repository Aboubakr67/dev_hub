import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/articles/${id}`
        );
        const { title, description, categories } = response.data;
        setTitle(title);
        setDescription(description);
        setSelectedCategories(categories.map((cat) => cat._id));
      } catch (err) {
        setError("Article non trouvé.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setAllCategories(response.data);
      } catch (err) {
        setError("Impossible de récupérer les catégories.");
      }
    };
    fetchArticle();
    fetchCategories();
  }, [id]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/articles/${id}`, {
        title,
        description,
        categories: selectedCategories,
      });
      toast.success("Article mis à jour avec succès!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(`/article/${id}`);
      }, 1000);
    } catch (err) {
      toast.error("Erreur lors de la mise à jour de l'article.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Modifier l'article</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titre de l'article
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Sélectionner des catégories</label>
          <div className="d-flex flex-wrap">
            {allCategories.map((categorie) => (
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

        <button type="submit" className="btn btn-success">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
