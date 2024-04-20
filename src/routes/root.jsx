import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadNav from "./HeadNav";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../clients";

export default function Root() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <>
        {/* Header */}
        <Navbar handleSignOut={handleSignOut} />
        {session ? (
          ""
        ) : (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        )}{" "}
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
}
