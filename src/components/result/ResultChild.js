import React, { Fragment } from "react";
import "../css/result.css";
const resultChild = ({ data }) => {
  console.log(data);
  const printAll = data.map((doc, i) => {
    return (
      <div className="child-box" key={i} style={{ "--order": i }}>
        <div className="username">@{doc.answearUsername}</div>

        <div className="result-knowing-number">
          {doc.rightAnswers.filter((x) => x === true).length} /5
        </div>
        <div
          style={{ width: " 33%", display: "flex", justifyContent: "center" }}
        >
          {doc.rightAnswers.map((q, j) => {
            return (
              <Fragment key={j}>
                {q ? (
                  <div className="result-knowing-question"> Q{j + 1}</div>
                ) : (
                  ""
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  });
  return <Fragment> {printAll}</Fragment>;
};

export default resultChild;
