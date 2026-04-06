import "./styles/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Working from "./pages/Working";
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <Navbar onGetStarted={handleGetStarted} onCloseForm={handleCloseForm} />
      <Routes>
        <Route path="/" element={<Hero showForm={showForm} onGetStarted={handleGetStarted} onCloseForm={handleCloseForm} />} />
        <Route path="/get-started" element={<Hero showForm={showForm} onGetStarted={handleGetStarted} onCloseForm={handleCloseForm} />} />
        <Route path="/how-it-works" element={<Working />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />}/>
      </Routes>
      <Footer onGetStarted={handleGetStarted} onCloseForm={handleCloseForm} />
    </>
  );
}

export default App;