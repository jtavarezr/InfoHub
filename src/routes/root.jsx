import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadNav from "./HeadNav";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";

export default function Root() {
  return (
    <>
      {/* Header */}
      <Navbar isLogged={true} />
      {/* End Header */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 col-md-3 d-none d-md-block">
            <SideNav />
          </div>
          {/* End Sidebar */}

          {/* Main Content */}
          <div className="col-lg-10 col-md-9">
            <Outlet />
          </div>
          {/* End Main Content */}
        </div>
      </div>
    </>
  );
}
