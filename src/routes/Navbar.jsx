import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import supabase from "../clients";

const CustomNavbar = () => {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          setUser(userData.user);
          console.log("USER INFO:", userData.user.user_metadata.first_name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);




  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/all">
          <i className="bi bi-house"></i>
        </Link>
      </Navbar.Brand>
      <Form className="d-none d-sm-flex ms-auto">
        <FormControl
          type="search"
          placeholder="Search"
          className="mr-2"
          aria-label="Search"
        />
        <Button variant="outline-light">
          <i className="bi bi-search"></i>
        </Button>
      </Form>
      <Nav className="ms-auto">
        <Nav.Link>
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
            className="rounded-circle"
            height="22"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </Nav.Link>


        <NavDropdown
          title={user?.user_metadata?.first_name}
          className="btn-group dropstart"
        >
          <NavDropdown.Item className="bi bi-envelope"><Link to={"/dashboard"}>dashboard</Link></NavDropdown.Item>
          <NavDropdown.Item>Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
