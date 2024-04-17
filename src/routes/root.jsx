import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadNav from "./HeadNav";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";


export default function Root() {
  return (
    <>
      {/* Header */}
      <HeadNav isLogged={true} />
      {/* End Header */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2 col-md-3">
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
