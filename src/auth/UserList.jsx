import { useEffect, useState } from "react";
import  supabase  from "../clients";

const UserList = () => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
        const {
          data: { users },
          error,
        } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 1000,
        });


      if (error) setError(error.message);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

  if (error) return <p>{error}</p>;
  if (!users) return <p>Loading...</p>;

  return (
    <>
/*     <ul>
      {users.map((user) => (
          <li key={user.id}>
          {user.email} - {user.username}
        </li>
      ))}
    </ul> */
      </>
  );
};

export default UserList;
