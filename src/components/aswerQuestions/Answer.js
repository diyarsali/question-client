import { useEffect, useState, useRef } from "react";
import Choose from "./Choose";
import axios from "../../axios.js";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/answer.css";
// import { padding } from "@mui/system";

const Answer = () => {
  let userIDselected = useParams();
  let recieverID = userIDselected.id;
  const hasFetchedData = useRef(false);
  const [username, setUsername] = useState("");
  const [questionArr, setQuestionArr] = useState([]);

  const [i, setI] = useState(0);
  const [answered, setAnswered] = useState(0);
  // useSubmit( RAQ);

  useEffect(() => {
    if (!hasFetchedData.current) {
      try {
        var decode = jwt_decode(localStorage.getItem("token"));
        let answearUsername = decode.username;

        axios
          .post("result/getResult", {
            answearUsername: answearUsername,
            recieverID: recieverID,
          })
          .then((res) => {
            // console.log(res.data.rightAnswers.length);

            if (res.data) {
              console.log(res.data.rightAnswers.length);
              let arrlength = res.data.rightAnswers.length;

              if (arrlength !== 0 && arrlength < 5) {
                setI(res.data.rightAnswers.length);

                console.log(res.data.rightAnswers);
              }
              if (arrlength === 5) {
                setAnswered(arrlength);
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
      // get

      axios
        .post("question/getQuestion", {
          authID: recieverID,
        })
        .then((res) => {
          setUsername(res.data.AnsweringTo);
          setQuestionArr(res.data.question);
        });

      hasFetchedData.current = true;
    }
  }, [recieverID]);

  // send answere to database

  // const answearUsername = 'diyar';
  async function saveResult(j) {
    try {
      var decode = jwt_decode(localStorage.getItem("token"));
      let answearUsername = decode.username;

      console.log("add to answer");
      console.log("j " + j);
      await axios
        .post("result/add", {
          answearUsername: answearUsername,
          recieverID: recieverID,
          RightAnswer: j,
        })
        .catch((err) => {
          // some error handling
        });
    } catch (err) {
      console.log(err);
    }
  }

  const submitAnswer = (L) => {
    // if the Question is right save to mongo
    if (L === questionArr[i].rightAnswer) {
      console.log("correct");
      saveResult(true);
    } else {
      saveResult(false);
    }

    setI((prev) => prev + 1);

    // console.log('i ' + i);
  };

  if (questionArr.length !== 0) {
    if (i === questionArr.length || answered) {
      // console.log('hellow i is grater');
      return (
        <div className="lert-wrapper">
          <div className="lert-box">
            <div className="alert-warning">
              <p>All Answered to @{username}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="wraper">
          <div className="answer-box">
            <div className="header-wrapper1">
              <div style={{ marginRight: "4px" }}>
                <p>Answering to </p>
              </div>
              <div>
                <p style={{ color: "#3f50b5" }}>@{username}</p>
              </div>
            </div>

            <div className="question-user">
              <div className="counter">
                <p
                  style={{
                    color: "#757de8",
                    padding: "0",
                    margin: "0 4px 0 0 ",
                  }}
                >{`Q ${i + 1}:   `}</p>
              </div>
              <div>
                <p style={{ fontSize: " 24px", padding: "0", margin: "0" }}>
                  {questionArr[i].question} ?
                </p>
              </div>
            </div>
            <div className="Choosquestion-wrapper">
              <div className="Choosquestion-group">
                <Choose
                  letter="A"
                  answer={questionArr[i].answerA}
                  submitAnswer={submitAnswer}
                />
                <Choose
                  letter="B"
                  answer={questionArr[i].answerB}
                  submitAnswer={submitAnswer}
                />

                <Choose
                  letter="C"
                  answer={questionArr[i].answerC}
                  submitAnswer={submitAnswer}
                />
                <Choose
                  letter="D"
                  answer={questionArr[i].answerD}
                  submitAnswer={submitAnswer}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="lert-wrapper">
        <div className="lert-box-2">
          <div className="alert-name">
            {" "}
            <p>@{username} </p>
          </div>
          <div className="alert-message">
            {" "}
            <p>I don't have any questions</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Answer;
