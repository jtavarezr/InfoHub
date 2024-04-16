import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


const HeadNav = ({ isLogged }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container">
          <Link to={"/"} className="navbar-brand me-2">
            <i className="bi bi-globe-americas"></i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center">
              {isLogged ? (
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-link px-3 me-2"
                >
                  <Link to={"/login"}>Logout</Link>
                </button>
              ) : (
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-link px-3 me-2"
                >
                  <Link to={"/logout"}>Login</Link>
                </button>
              )}

              {isLogged ? null : (
                <button
                  data-mdb-ripple-init
                  type="button"
                  className="btn btn-primary me-3"
                >
                  Sign up for free
                </button>
              )}

              <a
                data-mdb-ripple-init
                className="btn btn-primary px-3"
                href="https://github.com/jtavarezr/"
                role="button"
              >
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HeadNav;
