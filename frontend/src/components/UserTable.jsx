function UserTable({
  users,
  handleDelete,
}) {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>{user.role}</td>

            <td>
              <button
                onClick={() =>
                  handleDelete(user._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;