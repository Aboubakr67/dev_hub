import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../DataTest/CategoriesTest";

const ArticleItem = ({ article }) => {

  const category = categories.find((cat) => cat._id === article.categories[0]);

  console.log(category.image);

  return (
    <div className="article-item card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          {category && (
            <img
              src={category.image}
              alt={category.nom}
              style={{ width: "30px", marginRight: "10px" }}
            />
          )}
          {article.title}
        </h5>
        <p className="card-text">{article.description}</p>
        <p className="card-text">
          <small className="text-muted">
            Par {article.username} |{" "}
            {new Date(article.created_at).toLocaleDateString()}
          </small>
        </p>
        <Link to={`/article/${article._id}`} className="btn btn-primary">
          Consulter
        </Link>
      </div>
    </div>
  );
};

export default ArticleItem;
