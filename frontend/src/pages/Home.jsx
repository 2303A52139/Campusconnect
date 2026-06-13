import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>CampusConnect</h1>

      <h2>Welcome</h2>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br /><br />

      <Link to="/register">
        <button>Register</button>
      </Link>

      <br /><br />

      <Link to="/profile">
        <button>Profile</button>
      </Link>
    </div>
  );
}

export default Home;