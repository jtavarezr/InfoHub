import React, { useState, useEffect } from "react";
import supabase from "../clients";
import {
  CCol,
  CFormCheck,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormSelect, CForm, CButton,
  CFormInput,
} from "@coreui/react";

function UserInfo() {
  const [firstName, setFirstName] = useState("");
  const [user, setUser] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUsername] = useState("");
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
          setUsername(userData.user.user_metadata?.userName || "");
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
    <>
      <h1>User Information </h1>
      <p>Email: {user.email}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>User Name: {userName}</p>
      <CForm
        className="row gy-2 gx-3 align-items-center"
        onSubmit={handleUpdate}
      >
        <CCol md={3}>
          <CFormLabel className="visually-hidden" htmlFor="fname">
            First Name
          </CFormLabel>
          <CFormInput
            id="fname"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </CCol>
        <CCol md={4}>
          <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
            Last Name
          </CFormLabel>
          <CFormInput
            id="autoSizingInput"
            placeholder=" LastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </CCol>
        <CCol md={7}>
          <CFormLabel
            className="visually-hidden"
            htmlFor="autoSizingInputGroup"
          >
            Email
          </CFormLabel>
          <CInputGroup>
            <CInputGroupText>@</CInputGroupText>
            <CFormInput
              id="autoSizingInputGroup"
              placeholder="email"
              value={user.email}
              disabled
            />
          </CInputGroup>
        </CCol>
        <CCol md={12} />
        <CCol md={3}>
          <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
            User Name
          </CFormLabel>
          <CFormInput
            id="autoSizingInput"
            placeholder="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </CCol>
        <CCol md={3}>
          <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
            Password
          </CFormLabel>
          <CFormInput id="autoSizingInput" placeholder="password" />
        </CCol>
        <CCol md={6}>
          <CFormLabel className="visually-hidden" htmlFor="autoSizingSelect">
            Preference
          </CFormLabel>
        </CCol>

        <CCol xs="auto">
          <CButton color="primary" type="submit">
            Submit
          </CButton>
        </CCol>
      </CForm>
    </>
  );
}

export default UserInfo;