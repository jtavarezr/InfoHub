import { useRef, useState } from "react";
import supabase from "../clients";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");




  const [avatarFile, setAvatarFile] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();
    const values = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      options: {
        data: {
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          age: ageRef.current.value,
        },
        avatar: avatarFile,
      },
    };

    console.log("Values ->", values)
    const { user, error } = await supabase.auth.signUp(values);

    if (error) {
      console.log("Error registering user:", error.message);
    } else {
      console.log("User registered successfully:", user);
    }
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Register</h2>
                  <Form onSubmit={handleRegister}>
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" ref={firstNameRef} required />
                    </Form.Group>
                    <Form.Group id="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" ref={lastNameRef} required />
                    </Form.Group>
                    <Form.Group id="age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="number" ref={ageRef} required />
                    </Form.Group>
                    <Form.Group id="avatar">
                      <Form.Label>Avatar</Form.Label>
                      <Form.Control type="file" ref={avatarFile} required />
                    </Form.Group>
                    {errorMsg && (
                      <Alert
                        variant="danger"
                        onClose={() => setErrorMsg("")}
                        dismissible
                      >
                        {errorMsg}
                      </Alert>
                    )}
                    <div className="text-center mt-2">
                      <Button type="submit" className="w-50">
                        Register
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
                <div className="w-100 text-center mt-2">
                  Already Register?<Link to={"/login"}>Login</Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
