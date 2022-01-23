import React from "react";
// import '../css/answer.css';

const Choose = ({ letter, answer, submitAnswer }) => {
  return (
    <div
      className=" Choosquestion-group-each"
      onClick={submitAnswer.bind(null, letter)}
    >
      <div className="each-letter">
        {" "}
        <p style={{ fontWeight: "bold" }}> {letter}</p>
      </div>

      <div className="each-answer">
        {" "}
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default Choose;
