import { useState, useEffect, Fragment } from "react";
import "../css/question.css";
import {
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Complete from "./Complete";
import axios from "../../axios";
import jwt_decode from "jwt-decode";

const Question = () => {
  const [question, setQuestion] = useState("");
  const [answerA, setAnswerA] = useState("");
  const [answerB, setAnswerB] = useState("");
  const [answerC, setAnswerC] = useState("");
  const [answerD, setAnswerD] = useState("");
  const [realAnswer, setRealAnswer] = useState("A");
  const [counter, setCounter] = useState(0);
  const [validation, setValidation] = useState(false);

  const [complete, setComplete] = useState(false);

  const [getAllQuestion, setgetAllQuestion] = useState([]);

  useEffect(() => {
    try {
      var decoded = jwt_decode(localStorage.getItem("token"));
      const username = decoded.username;

      axios
        .post("question/getAll", {
          username: username,
        })
        .then((res) => {
          setgetAllQuestion(res.data);
          // if we have out number of question
          // setCounter(res.data.length + 1);

          if (res.data.length !== 0 && res.data.length === 5) {
            //set counter to one if 5 questions
            setComplete(true);
            setCounter(0);
            //
          }
          if (res.data.length !== 0 && res.data.length !== 5) {
            console.log(res.data.length);

            setCounter(res.data.length);
            //
          }
        });
    } catch (err) {
      // invalid token format
      console.log(err);
    }
    // console.log(username);
  }, [complete]);
  console.log("counter  " + counter);
  const nextQuestion = () => {
    try {
      var decoded = jwt_decode(localStorage.getItem("token"));

      const username = decoded.username;
      // const username = 'diyar';
      // validation
      if (
        question === "" ||
        answerA === "" ||
        answerB === "" ||
        answerC === "" ||
        answerD === "" ||
        realAnswer === ""
      ) {
        setValidation(true);
        console.log("validation");
      } else {
        setValidation(false);

        if (counter === 5) {
          setComplete(true);
        } else {
          setCounter(counter + 1);
          console.log("in save mode");
          axios
            .post("question/save", {
              question: question,
              answerA: answerA,
              answerB: answerB,
              answerC: answerC,
              answerD: answerD,
              rightAnswer: realAnswer,
              user: username,
            })

            .catch((err) => {
              console.log(err);
            });
          setQuestion("");
          setAnswerA("");
          setAnswerB("");
          setAnswerC("");
          setAnswerD("");
          setRealAnswer("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      {complete ? (
        <Complete data={getAllQuestion} />
      ) : (
        <div className="question-wrapper">
          <div className="question-box">
            <div className="title"> Create 5 Question</div>
            <p> {`Question: ${counter} `}</p>
            <div className="register-from">
              <div className="question-input">
                <TextField
                  autoComplete="off"
                  fullWidth
                  id="standard-basic"
                  label="Add"
                  variant="standard"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="answer-wrapper">
                <div className="answers-group">
                  <TextField
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="A"
                    sx={{ marginRight: "4px" }}
                    value={answerA}
                    onChange={(e) => setAnswerA(e.target.value)}
                  />
                  <div> </div>
                  <TextField
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="B"
                    value={answerB}
                    onChange={(e) => setAnswerB(e.target.value)}
                  />
                </div>
                <div className="answers-group">
                  <TextField
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="C"
                    sx={{ marginRight: "4px" }}
                    value={answerC}
                    onChange={(e) => setAnswerC(e.target.value)}
                  />
                  <TextField
                    autoComplete="off"
                    size="small"
                    variant="outlined"
                    id="outlined-basic"
                    label="D"
                    value={answerD}
                    onChange={(e) => setAnswerD(e.target.value)}
                  />
                </div>
              </div>

              <div className="footer-question">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    your Answere
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={realAnswer}
                    label="select Answere"
                    onChange={(e) => setRealAnswer(e.target.value)}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"B"}>B</MenuItem>
                    <MenuItem value={"C"}>C</MenuItem>
                    <MenuItem value={"D"}>D</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={nextQuestion}
                  variant="outlined"
                  endIcon={<SendIcon />}
                  style={{ marginTop: "10px" }}
                >
                  Next
                </Button>
              </div>
            </div>
            {validation ? (
              <div className="error-register">
                <p> Fill the inputs</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Question;
