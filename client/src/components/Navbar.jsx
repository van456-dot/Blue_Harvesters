import { useState } from "react";
import { Link } from "react-router-dom";


const navItems = [
  { label: "Home", to: "/", isFormTrigger: false },
  { label: "Get Started", to: "/", isFormTrigger: true },
  { label: "How it works", to: "/how-it-works" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar({ onGetStarted, onCloseForm }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (item) => {
    if (item.isFormTrigger && onGetStarted) {
      onGetStarted();
    } else if (onCloseForm) {
      onCloseForm();
    }
    closeMenu();
  };

  return (
    <header className="navbar">
      <Link
        to="/"
        className="navbar__brand"
        role="button"
        tabIndex={0}
        onClick={closeMenu}
        onKeyDown={(event) => {
          if (event.key === "Enter") closeMenu();
        }}
      >
        <div className="title">JalVrishti</div>
        <div className="team">by Blue Harvesters</div>
      </Link>

      <button
        type="button"
        className="navbar__toggle"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        ☰
      </button>

      <nav className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}>
        <ul className="navbar__list">
          {navItems.map(({ label, to, isFormTrigger }) => (
            <li key={to}>
              <Link to={to} onClick={() => handleNavClick({ isFormTrigger })}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;