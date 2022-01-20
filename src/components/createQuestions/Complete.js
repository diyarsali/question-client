import React, { Fragment, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import "../css/answer.css";
import "../css/question.css";
import Choose from "./Choose";
import axios from "../../axios.js";
import jwt_decode from "jwt-decode";
import Question from "./Question.js";

const Complete = ({ data }) => {
  const [noQuestion, usenoQuestion] = useState(false);

  // console.log(data);
  const render = data.map((doc, i) => {
    return (
      <div className="wraper-Reviewing" key={i}>
        <div className="answer-box">
          <div
            style={{ fontWeight: "bold", fontSize: " 20px" }}
            className="Question-Number"
          >
            <p> Q{i + 1}</p>
          </div>

          <div style={{ fontSize: " 24px" }} className="question-user">
            <p>{doc.question} ?</p>
          </div>
          <div className="Choosquestion-wrapper">
            <div className="Choosquestion-group">
              <Choose letter="A" answer={doc.answerA} />
              <Choose letter="B" answer={doc.answerB} />
            </div>
            <div className="Choosquestion-group">
              <Choose letter="C" answer={doc.answerC} />
              <Choose letter="D" answer={doc.answerD} />
            </div>
          </div>
        </div>
      </div>
    );
  });

  const deleteAllQuestion = () => {
    try {
      var decoded = jwt_decode(localStorage.getItem("token"));
      const username = decoded.username;
      axios
        .post("question/deleteAll", {
          username: username,
        })
        .then(usenoQuestion(true));
    } catch (err) {}
  };

  return (
    <Fragment>
      {noQuestion ? (
        <Question />
      ) : (
        <div>
          <div>
            <div className="header-Reviewing">
              <h1>Reviewng your question </h1>
            </div>
          </div>
          {render}
          <div>
            <div className="header-Reviewing" style={{ marginBottom: "8px" }}>
              <Button
                onClick={deleteAllQuestion}
                color="secondary"
                variant="contained"
                startIcon={<DeleteIcon />}
              >
                Delete All
              </Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Complete;
