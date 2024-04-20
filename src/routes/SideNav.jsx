import React from "react";
import { Link } from "react-router-dom";

const SideNav = ({ handleSignOut }) => {
  return (
    <>
      <header>
        {/* Sidebar */}
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white max-width-xxl"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to={"/all"}
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="bi bi-bank fa-fw me-3"></i>
                <span>Main dashboard</span>
              </Link>
              <Link
                to={"/new"}
                className="list-group-item list-group-item-action py-2 ripple "
              >
                <i className="bi bi-broadcast fa-fw me-3"></i>
                <span>Create</span>
              </Link>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-lock fa-fw me-3"></i>
                <span>Password</span>
              </a>
              <Link
                to={"/update"}
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-bar-chart fa-fw me-3"></i>
                <span>Update</span>
              </Link>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-pie fa-fw me-3"></i>
                <span>SEO</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-chart-bar fa-fw me-3"></i>
                <span>Orders</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-globe fa-fw me-3"></i>
                <span>International</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-building fa-fw me-3"></i>
                <span>Partners</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-calendar fa-fw me-3"></i>
                <span>Calendar</span>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-users fa-fw me-3"></i>
                <span>Users</span>
              </a>
              <button className="dropdown-item" onClick={handleSignOut}>
                Logout
              </button>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
      </header>
      <div className="container-fluid"> </div>
    </>
  );
};

export default SideNav;
