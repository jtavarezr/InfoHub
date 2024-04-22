import React, { useState, useEffect } from "react";
import supabase from "../clients";

function UserInfo() {
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
          console.log("USER INFO:", userData.user.user_metadata);
          if (userData.user?.user_metadata?.avatar) {
            console.log("TIENE AVATAR")
            const { data: signedUrlData, error: signedUrlError } = await supabase.storage
              .from("avatars")
              .createSignedUrl(userData.user.user_metadata.avatar, 60 * 60 * 24 * 365); // 1 year expiration
            if (signedUrlError) {
              console.error("Error fetching avatar URL:", signedUrlError.message);
            } else {
              setAvatarUrl(signedUrlData.signedURL);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>User Info</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h1>User Info</h1>
        <p>No user data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>User Info</h1>
      <p>Email: {user.email}</p>
      <p>First Name: {user.user_metadata.first_name}</p>
      <p>Last Name: {user.user_metadata.last_name}</p>
      <p>Age: {user.user_metadata.age}</p>
      {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
    </div>
  );
}

export default UserInfo;