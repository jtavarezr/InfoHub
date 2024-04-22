import { useState } from "react";
import supabase from "../clients";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      // Sign up with email and password
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        throw new Error("Error signing up: " + error.message);
      }

      // Create a new user in the users table
      const { data, error: userError } = await supabase
        .from("users")
        .insert({ email, username });
      if (userError) {
        throw new Error("Error creating user: " + userError.message);
      }

      // Link the user to the auth.users table
      const { error: linkError } = await supabase.auth.link("email", {
        id: user.id,
      });
      if (linkError) {
        throw new Error("Error linking user: " + linkError.message);
      }

      console.log("User signed up:", user);
      console.log("User created:", data);
      console.log("User linked:", user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6 form-widget">
        <h1 className="header">Sign Up</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="form-widget" onSubmit={handleSignUp}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="password"
              placeholder="Your password"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="inputField"
              type="text"
              placeholder="Your username"
              value={username}
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button className={"button block"} type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
