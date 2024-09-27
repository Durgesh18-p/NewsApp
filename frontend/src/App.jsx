import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsDetails from "./pages/NewsDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />{" "}
        <Route path="/news/:id" element={<NewsDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
