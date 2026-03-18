import { useState } from "react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Get Started", href: "#calculator" },
  { label: "How it works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div
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
      </div>

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
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;