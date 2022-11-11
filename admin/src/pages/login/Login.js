import { useState } from "react";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   handleLogin
  const handleLogin = (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
