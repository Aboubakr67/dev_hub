import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategorieDetails = () => {
  const { id } = useParams();
  const [categorie, setCategorie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/categories/${id}`
        );
        setCategorie(response.data);
      } catch (err) {
        setError("Catégorie non trouver.");
      }
    };

    fetchCategorieDetails();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      {categorie && (
        <article className="categorie-item card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {categorie.image && (
                <img
                  src={categorie.image}
                  alt={categorie.nom}
                  style={{ width: "30px", marginRight: "10px" }}
                />
              )}
              {categorie.nom}
            </h5>
            <p className="card-text">{categorie.description}</p>
            <p className="card-text">
              <small className="text-muted">
                Créé le {new Date(categorie.createdAt).toLocaleDateString()}
              </small>
            </p>
            <Link to="/categories" className="btn btn-secondary">
              Retour aux catégories
            </Link>
          </div>
        </article>
      )}
    </>
  );
};

export default CategorieDetails;
