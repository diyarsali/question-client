import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { NavLink, Redirect } from "react-router-dom";
import "../css/login.css";
import axios from "../../axios.js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [usedUsername, setUsedUsername] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const [validation, setValidation] = useState(false);
  const [id, setID] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username === "" || name === "" || password === "") {
      setValidation(true);
    } else {
      axios
        .post("users/signup", {
          username: username,
          name: name,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          setID(res.data.id);
          setUsedUsername(res.data.usedUsername);
          setUserRegistered(res.data.userRegistered);
          console.log(res.data.id);
        })
        .catch((err) => {
          console.log("Error making post request");
        });
    }
  }

  return (
    <div className="signup-wraper">
      <div className="signup-box">
        <div className="title-form">Signup</div>
        <form onSubmit={handleSubmit}>
          <div className="register-from">
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
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
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Signup
            </Button>
          </div>
        </form>
        {usedUsername ? (
          <div className="error-register">
            <p> username is available </p>
          </div>
        ) : (
          <p />
        )}
        {validation ? (
          <div className="error-register">
            <p> fill the gaps </p>
          </div>
        ) : (
          <p />
        )}
        <div className="Link-acount">
          <NavLink to="/Login">Login</NavLink>
        </div>
      </div>
      {userRegistered ? <Redirect to={"/t/" + id} /> : ""}
    </div>
  );
};

export default Signup;
