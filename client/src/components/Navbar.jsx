import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav>
      <div className="logo">
        <div className="title">JalVrishti</div>
        <div className="team">by Blue Harvesters</div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <div className={`navlist ${menuOpen ? "active" : ""}`}>
        <ul className="listitems">
          <li><a href="/">Home</a></li>
          <li><a href="#">Get Started</a></li>
          <li><a href="#">How It Works?</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;