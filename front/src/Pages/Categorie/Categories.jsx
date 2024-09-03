import React from "react";
import CategorieItem from "../../Components/CategorieItem";

const Categories = () => {
  const categories = [
    {
      _id: "63f8f8b1f99d1b2e5e7a80e1",
      nom: "Java",
      image: "/img/java.ico",
      description: "Java est un langage de programmation orienté objet.",
      created_at: "2024-09-01T12:00:00Z",
      updated_at: "2024-09-01T12:00:00Z",
    },
    {
      _id: "63f8f8b1f99d1b2e5e7a80e2",
      nom: "JavaScript",
      image: "/img/js.ico",
      description: "JavaScript est un langage de programmation dynamique.",
      created_at: "2024-09-01T12:00:00Z",
      updated_at: "2024-09-01T12:00:00Z",
    },
  ];

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Catégories</h1>
      <div className="row">
        {categories.map((categorie) => (
          <div key={categorie._id} className="col-md-4">
            <CategorieItem categorie={categorie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
