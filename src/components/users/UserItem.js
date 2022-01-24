import React, { Fragment } from "react";
import "../css/users.css";

const UserItem = ({ users, answerQuestion }) => {
  const item = users.map((user, i) => {
    return (
      <div className="userItem-wrapper" key={i}>
        <div className="each-user">
          <p
            onClick={answerQuestion.bind(null, user._id)}
            style={{
              color: "#3f50b5",
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {" "}
            {user.name}
          </p>
          <p style={{ fontSize: "10px", color: "#f44336", margin: 0 }}>
            {" "}
            @{user.username}
          </p>
        </div>
      </div>
    );
  });
  return <Fragment>{item}</Fragment>;
};

export default UserItem;
