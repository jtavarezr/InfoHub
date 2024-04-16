import React from "react";
import { Link } from "react-router-dom";

const MainNavigation = () => {

     const createPost = async (event) => {
       event.preventDefault();

       if (
         !post.name ||
         !post.description
       ) {
         alert("Please fill out all required fields");
         return;
       }

       try {
         await supabase.from("crewmates").insert([post]);
         setShowSuccessMessage(true);
         setPost(initialState);
       } catch (error) {
         console.error("Error creating crewmate:", error.message);
       }
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
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="bi bi-bank fa-fw me-3"></i>
                <span>Main dashboard</span>
              </a>
              <Link to={"/new"}
                href="#"
                className="list-group-item list-group-item-action py-2 ripple active"
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
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="bi bi-bar-chart fa-fw me-3"></i>
                <span>Analytics</span>
              </a>
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
              <a
                href="#"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fas fa-money-bill fa-fw me-3"></i>
                <span>Sales</span>
              </a>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
      </header>
      <div className="container-fluid"> </div>
    </>
  );
};

export default MainNavigation;
