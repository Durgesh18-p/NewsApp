import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsDetails from "./pages/NewsDetails";
import India from "./pages/India";
import Sport from "./pages/Sport";
import International from "./pages/International";
import Drama from "./pages/Drama";
import Healthcare from "./pages/Healthcare";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/india" element={<India />} />
        <Route path="/sports" element={<Sport />} />
        <Route path="/international" element={<International />} />
        <Route path="/drama" element={<Drama />} />
        <Route path="/healthcare" element={<Healthcare />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
