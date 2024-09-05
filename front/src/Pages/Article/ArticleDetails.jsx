import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/articles/${id}`
        );
        setArticle(response.data);
      } catch (err) {
        setError("Article non trouvé.");
      }
    };

    fetchArticleDetails();
  }, [id, location.state]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet article ?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        toast.success("Article supprimé avec succès!", {
          position: "bottom-right",
          autoClose: 3000,
        });
        navigate("/");
      } catch (err) {
        toast.error("Erreur lors de la suppression de l'article.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const recentDate = article
    ? new Date(
        article.updatedAt > article.createdAt
          ? article.updatedAt
          : article.createdAt
      ).toLocaleDateString()
    : null;

  return (
    <>
      {article && (
        <div className="container my-5">
          <ToastContainer />
          <h1 className="text-center mb-4">{article.title}</h1>

          <div className="category-badges text-center mb-4">
            {article.categories.map((category) => (
              <div
                key={category._id}
                style={{
                  display: "inline-block",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <img
                  src={category.image}
                  alt={category.nom}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    border: "2px solid #ddd",
                  }}
                  title={category.nom}
                />
                <p style={{ fontSize: "12px" }}>{category.nom}</p>
              </div>
            ))}
          </div>

          <p className="text-center">{article.description}</p>

          <p className="text-center text-muted">
            Dernière mise à jour : {recentDate}
          </p>

          <div className="text-center">
            <Link to={`/article/edit/${id}`} className="btn btn-warning me-2">
              Modifier
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Supprimer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleDetails;
