import { useState } from "react";
import supabase from "../clients";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault();

    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          age: age,
        },
        avatar: avatarFile,
      },
    });

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
    <form onSubmit={handleRegister}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <label>
        Avatar:
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
}
export default Register;
