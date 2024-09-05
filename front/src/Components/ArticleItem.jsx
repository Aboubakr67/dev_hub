import React from "react";
import { Link } from "react-router-dom";

const ArticleItem = ({ article }) => {
  return (
    <article className="article-item card mb-3">
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Par {article.username} |{" "}
            {new Date(article.createdAt).toLocaleDateString()}{" "}
          </small>
        </p>
        <Link to={`/article/${article._id}`} className="btn btn-primary">
          Consulter
        </Link>
      </div>
      <div className="card-footer">
        <div
          className="category-images"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {article.categories.map((category) => (
            <img
              key={category._id}
              src={category.image}
              alt={category.nom}
              style={{ width: "30px", marginLeft: "5px" }}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleItem;
