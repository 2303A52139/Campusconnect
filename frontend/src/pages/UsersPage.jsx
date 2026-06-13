import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../services/adminService";

import UserTable from "../components/UserTable";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      loadUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Users Management</h1>

      <UserTable
        users={users}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default UsersPage;