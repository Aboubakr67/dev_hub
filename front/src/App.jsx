import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Home from "./Pages/Home";
import ArticleDetails from "./Pages/Article/ArticleDetails";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NewArticle from "./Pages/Article/NewArticle";
import Categories from "./Pages/Categorie/Categories";

function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Router>
        <Header />
        <main style={{ paddingBottom: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-article" element={<NewArticle />} />
            <Route path="/article/:id" element={<ArticleDetails />} />
            <Route path="/categories" element={<Categories />} />
            {/* <Route path="/new-categorie" element={<NewCategorie />} /> */}
            {/* <Route path="/categorie/:id" element={<CategorieDetails />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
