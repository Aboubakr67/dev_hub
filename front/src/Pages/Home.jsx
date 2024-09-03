import React from "react";
import ArticleItem from "../Components/ArticleItem";
import { articles } from "../DataTest/ArticlesTest";

const Home = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Articles récents</h1>
      <div className="row">
        {articles.map((article) => (
          <div key={article._id} className="col-md-4">
            <ArticleItem article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
