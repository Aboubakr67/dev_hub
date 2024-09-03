import React from "react";
import { useParams } from "react-router-dom";
import { articles } from "../../DataTest/ArticlesTest";

const ArticleDetails = () => {
  const { id } = useParams();
  const article = articles.find((article) => article._id === id);


  if (!article) {
    return <div>Article non trouvé</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">{article.title}</h1>
      <p>{article.description}</p>
      <p className="text-muted">Publié par: {article.username}</p>
      <p className="text-muted">
        Publié le : {new Date(article.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ArticleDetails;
