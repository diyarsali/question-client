import { Fragment, useEffect, useState } from "react";

import UserItem from "./UserItem";
import "../css/users.css";
import "../css/result.css";
import "../css/answer.css";
import axios from "../../axios";

import jwt_decode from "jwt-decode";

import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import '../css/answer.css';

const progressStyles = {
  width: "100%",
  height: " 80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",
  boxSizing: "border-box",
};

const Users = () => {
  const [users, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const handleClick = (Transition) => () => {};

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    try {
      var decoded = jwt_decode(localStorage.getItem("token"));
      const username = decoded.username;
      axios
        .post("users/getUsers", {
          username: username,
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const answerQuestion = async (id) => {
    const res = await axios.post("question/getQuestion", {
      authID: id,
    });
    let question = res.data.question;
    if (question.length === 0) {
      setOpen(true);
    } else {
      console.log(res.data);
      window.location.href = `/an/${id}`;
    }
  };

  if (isLoading) {
    return (
      <div style={progressStyles}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className="user-weraper">
          {users.length !== 0 ? (
            <UserItem users={users} answerQuestion={answerQuestion} />
          ) : (
            <div className="wraper">
              <div className="answer-box">
                <div className="header-wrapper">
                  <div className="header-wrapper-warning">
                    <p>Ther is no User</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Snackbar
          open={open}
          onClose={handleClose}
          message="this user have no Question"
        />
      </Fragment>
    );
  }
};

export default Users;
