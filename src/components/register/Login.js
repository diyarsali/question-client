import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { NavLink, Redirect } from "react-router-dom";
import axios from "../../axios.js";
import "../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [id, setID] = useState("");
  const [failedLoggingin, setFailedLoggingin] = useState(false);

  const [text, setText] = useState("waiting...");
  useEffect(() => {
    let isCancelled = false;

    if (!isCancelled) {
      setText("done!");
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post("users/login", {
      username: username,
      password: password,
      text: text,
    });

    const { data } = res;
    setID(data.id);
    localStorage.setItem("token", data.token);
    setLogin(res.data.login);
    setFailedLoggingin(data.failedLoggingin);
  };

  return (
    <div className="signup-wraper">
      <div className="signup-box">
        <div className="title-form">Login</div>
        <div className="register-from">
          <TextField
            autoComplete="off"
            id="standard-basic"
            label="Username"
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Login
          </Button>
        </div>

        {failedLoggingin ? (
          <div className="error-register">
            <p> Username and Password is incorrect</p>
          </div>
        ) : (
          <p />
        )}
        <div className="Link-acount">
          <NavLink to="/Signup">I dont have an account</NavLink>
        </div>

        {login ? <Redirect to={"/t/" + id} /> : ""}
      </div>
    </div>
  );
};

export default Login;
