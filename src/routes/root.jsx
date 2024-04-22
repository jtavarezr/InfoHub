import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeadNav from "./HeadNav";
import Navbar from "./Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../clients";
import LoginForm from "./Login";
import Register from "../auth/Register";

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


    return (
      <>
        {/* Header */}
        {session ? (
          <>
            <Navbar handleSignOut={handleSignOut} />
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
        ) : (
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/register"
              element={ <Register />
              }
            />
            <Route path="*" element={<LoginForm />} />
          </Routes>
        )}
      </>
    );
  }

