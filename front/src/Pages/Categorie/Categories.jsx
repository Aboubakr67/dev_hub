import React, { useEffect, useState } from "react";
import axios from "axios";
import CategorieItem from "../../Components/CategorieItem";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des catégories:", err);
        setError("Impossible de charger les catégories. Veuillez réessayer.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Catégories</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      {categories.length !== 0 ? (
        <div className="row">
          {categories.map((categorie) => (
            <div key={categorie._id} className="col-md-4">
              <CategorieItem categorie={categorie} />
            </div>
          ))}
        </div>
      ) : (
        <div>Aucune catégories</div>
      )}
    </div>
  );
};

export default Categories;
