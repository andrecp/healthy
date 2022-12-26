import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";

function Header(): JSX.Element {
  const { logout, email, isLoggedIn } = useContext(AuthContext);
  const [isActiveHamburger, setisActiveHamburger] = useState(false);

  let actionButtons = null;
  if (isLoggedIn) {
    actionButtons = (
      <div className="buttons">
        <p>Welcome {email}</p>
        <Link
          style={{ marginLeft: "10px" }}
          className="button is-primary"
          to="/"
          onClick={(e) => {
            setisActiveHamburger(false);
            logout();
          }}
        >
          <strong>Logout</strong>
        </Link>
      </div>
    );
  } else {
    actionButtons = (
      <div className="buttons">
        <Link
          className="button is-primary"
          to="/signup"
          onClick={() => {
            setisActiveHamburger(false);
          }}
        >
          <strong>Sign up</strong>
        </Link>
        <Link
          className="button is-light"
          to="/login"
          onClick={() => {
            setisActiveHamburger(false);
          }}
        >
          Log in
        </Link>
      </div>
    );
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link
          className="navbar-item"
          to="/"
          onClick={() => {
            setisActiveHamburger(false);
          }}
        >
          Home
        </Link>
        <a
          role="button"
          className={`navbar-burger ${isActiveHamburger ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          href="/"
          data-target="navbarBasicExample"
          onClick={(e) => {
            e.preventDefault();
            setisActiveHamburger(!isActiveHamburger);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActiveHamburger ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link
            className="navbar-item"
            to="/weight"
            onClick={() => {
              setisActiveHamburger(false);
            }}
          >
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
          <div className="navbar-item">{actionButtons}</div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
