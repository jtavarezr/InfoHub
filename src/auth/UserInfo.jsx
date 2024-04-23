import React, { useState, useEffect } from "react";
import supabase from "../clients";

function UserInfo() {
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setErrorMsg("");

      // Validar que los campos no estén vacíos
      if (!firstName || !lastName || !password) {
        setErrorMsg("Please fill in all the fields");
        return;
      }

      // Actualizar la información del usuario en Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        // Actualización exitosa
        console.log("User information updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user information:", error.message);
      setErrorMsg("Failed to update user information");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data: userData, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          setUser(userData.user);
          setFirstName(userData.user.user_metadata?.first_name || "");
          setLastName(userData.user.user_metadata?.last_name || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please sign in to update your information.</p>;

  return (
    <div>
      <h1>User Info</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <h1>Update User Information</h1>
      <form onSubmit={handleUpdate}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Information</button>
      </form>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
    </div>
  );
}

export default UserInfo;