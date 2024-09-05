import React from "react";
import { Link } from "react-router-dom";

const CategorieItem = ({ categorie }) => {
  return (
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
        <Link to={`/categorie/${categorie._id}`} className="btn btn-primary">
          Voir Détails
        </Link>
      </div>
    </article>
  );
};

export default CategorieItem;
