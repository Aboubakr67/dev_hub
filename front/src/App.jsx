import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./Pages/Home";
import ArticleDetails from "./Pages/Article/ArticleDetails";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NewArticle from "./Pages/Article/NewArticle";
import Categories from "./Pages/Categorie/Categories";
import CategorieDetails from "./Pages/Categorie/CategorieDetails";
import EditArticle from "./Pages/Article/EditArticle";

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Router>
        <Header />
        <main style={{ paddingBottom: "60px" }}>
          <Routes>
            {/* Article */}
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/article/edit/:id" element={<EditArticle />} />
            {/* Categorie */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/categorie/:id" element={<CategorieDetails />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
