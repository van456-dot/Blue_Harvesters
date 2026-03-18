function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__grid">
        <div className="footer__col">
          <h3>Learn</h3>
          <ul>
            <li>
              <a href="#how-it-works">How it works?</a>
            </li>
            <li>
              <a href="#how-it-works">Steps of rain harvesting</a>
            </li>
            <li>
              <a href="#how-it-works">Why collect rainwater</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:hello@blueharvesters.com">Email</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="#calculator">Get started</a>
            </li>
            <li>
              <a href="#about">About us</a>
            </li>
            <li>
              <a href="#how-it-works">How it works</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copy">© {new Date().getFullYear()} Blue Harvesters</div>
    </footer>
  );
}

export default Footer;