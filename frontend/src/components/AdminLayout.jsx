import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;