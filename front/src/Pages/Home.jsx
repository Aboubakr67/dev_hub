import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleItem from "../Components/ArticleItem";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles");
        setArticles(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles:", err);
        setError("Impossible de charger les articles. Veuillez réessayer.");
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Articles récents</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      {articles.length !== 0 ? (
        <div className="row">
          {articles.map((article) => (
            <div key={article._id} className="col-md-4">
              <ArticleItem article={article} />
            </div>
          ))}
        </div>
      ) : (
        <div>Aucun article</div>
      )}
    </div>
  );
};

export default Home;
