import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./Login";
import Register from "../auth/Register";
import supabase from "../clients";
import { styled, useTheme, alpha } from "@mui/material/styles";

import {
  MuiAppBar,
  MuiDrawer,
  InputBase,
} from "../components/indexImports";
import MainLayout from "../views/MainLayout";


export default function Root() {
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

  return session ? <MainLayout /> : <Authenticator />;
}

function Authenticator() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<LoginForm />} />
    </Routes>
  );
}

