import { Link } from "react-router-dom";
import MultiStepForm from './MultiStepForm';

function Footer({ onGetStarted, onCloseForm }) {
  return (
    <footer className="footer" id="contact">
      <div className="footer__grid">
        <div className="footer__col">
          <h3>Learn</h3>
          <ul>
            <li>
              <Link to="/how-it-works" onClick={onCloseForm}>How it works?</Link>
            </li>
            <li>
              <Link to="/how-it-works" onClick={onCloseForm}>Steps of rain harvesting</Link>
            </li>
            <li>
              <Link to="/how-it-works" onClick={onCloseForm}>Why collect rainwater</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Contact</h3>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/vansh-goel-743329307"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a href="mailto:vansh27319@gmail.com">Email</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/" role="button" onClick={onGetStarted}>Get started</Link>
            </li>
            <li>
              <Link to="/about" onClick={onCloseForm}>About us</Link>
            </li>
            <li>
              <Link to="/how-it-works" onClick={onCloseForm}>How it works</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__copy">© {new Date().getFullYear()} Blue Harvesters</div>
    </footer>
  );
}

export default Footer;