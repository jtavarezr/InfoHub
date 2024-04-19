import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-body-tertiary">
      {" "}
      {/* Mueve la clase bg-body-tertiary aquí */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-between">
          {/* Left elements */}
          <div className="d-flex">
            {/* Brand */}
            <a
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              href="#"
            >
              <i className="bi bi-newspaper"></i>
              {/*               <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                height="20"
                alt="Logo"
                loading="lazy"
                style={{ marginTop: "2px" }}
              /> */}
            </a>

            {/* Search form */}
            <form className="input-group w-auto my-auto d-none d-sm-flex">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder="Search"
                style={{ minWidth: "125px" }}
              />
              {" ... "}
              <span className="input-group-text border-0 d-none d-lg-flex">
                <i className="bi bi-search"></i>
              </span>
            </form>
          </div>
          {/* Left elements */}

          {/* Right elements */}
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3 me-lg-1">
              <a className="nav-link d-sm-flex align-items-sm-center" href="#">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
                  className="rounded-circle"
                  height="22"
                  alt="Black and White Portrait of a Man"
                  loading="lazy"
                />
              </a>
            </li>

            <li></li>
            <li className="nav-item dropdown dark me-3 me-lg-1">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="text-white">Options</span>
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link to={"/all"} className="dropdown-item" href="#">
                    News
                  </Link>
                </li>
                <li>
                  <Link to={"/new"} className="dropdown-item" href="#">
                    Create
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else.
                  </a>
                </li>
                <li>
                  <Link to={"/login"} className="dropdown-item" href="#">
                    Logout.
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          {/* Right elements */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
