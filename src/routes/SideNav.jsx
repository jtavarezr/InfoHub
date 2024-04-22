import React from "react";
import { Link } from "react-router-dom";
import supabase from "../clients";

const SideNav = () => {
    const handleSignOut = async () => {
      const { error } = await supabase.auth.signOut();
    };
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
                <i className="bi bi-house-fill fa-fw me-3"></i>
                <span>Feeds</span>
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
                <i className="bi bi-graph-up-arrow fa-fw me-3"></i>
                <span>Popular</span>
              </a>
              <Link
                to={"/recents"}
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-clock-fill fa-fw me-3"></i>
                <span>Recents</span>
              </Link>
              <Link
                to={"/videos"}
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-person-video2 fa-fw me-3"></i>
                <span>Videos</span>
              </Link>
              <Link
                to={"/questions"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-question-circle-fill fa-fw me-3"></i>
                <span>Questions</span>
              </Link>
              <Link
                to={"/topics"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-tags-fill fa-fw me-3"></i>
                <span>Topics</span>
              </Link>
              <Link
                to={"/lists"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-list fa-fw me-3"></i>
                <span>List</span>
              </Link>
              <Link
                to={"/groups"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-people-fill fa-fw me-3"></i>
                <span>Groups</span>
              </Link>
              <Link
                to={"/user"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-people-fill fa-fw me-3"></i>
                <span>User Info</span>
              </Link>
              <Link
                to={"/conducts"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-people fa-fw me-3"></i>
                <span>Conduct Code</span>
              </Link>
              <Link
                to={"/about"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-people fa-fw me-3"></i>
                <span>About</span>
              </Link>
              <button
                className="dropdown-item bi bi-box-arrow-right"
                onClick={handleSignOut}
              >
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
