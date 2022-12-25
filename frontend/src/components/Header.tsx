import { Link } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <div className="block">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            <Link className="navbar-item" to="/weight">
              Weight
            </Link>
            <Link className="navbar-item" to="/exercise">
              Exercise
            </Link>
            <Link className="navbar-item" to="/diet">
              Diet
            </Link>
            <Link className="navbar-item" to="/about">
              About
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link className="button is-primary" to="/signup">
                  <strong>Sign up</strong>
                </Link>
                <Link className="button is-light" to="/login">
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
