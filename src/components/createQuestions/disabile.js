// import { useState, useEffect } from 'react';
// import '../css/question.css';
// import { TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import Complete from './Complete';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';

// const Question = () => {
// 	const [ question, setQuestion ] = useState('');
// 	const [ answerA, setAnswerA ] = useState('');
// 	const [ answerB, setAnswerB ] = useState('');
// 	const [ answerC, setAnswerC ] = useState('');
// 	const [ answerD, setAnswerD ] = useState('');
// 	const [ realAnswer, setRealAnswer ] = useState('A');
// 	const [ counter, setCounter ] = useState(1);
// 	const [ i, setI ] = useState(0);
// 	const [ validation, setValidation ] = useState(false);

// 	const [ complete, setComplete ] = useState(false);

// 	const [ editQuestion, setEditQuestion ] = useState([]);
// 	var decoded = jwt_decode(localStorage.getItem('token'));
// 	const username = decoded.username;

// 	useEffect(() => {
// 		console.log(username);
// 		axios
// 			.post('http://localhost:5000/question/getAll', {
// 				username: username
// 			})
// 			.then((res) => {
// 				setEditQuestion(res.data);
// 				// if we have out number of question
// 				// setCounter(res.data.length + 1);
// 				// console.log(res.data.length);
// 				if (res.data.length !== 0) {
// 					//set counter to one if 5 questions
// 					setComplete(true);
// 					setCounter(0);
// 					//
// 					console.log(res.data);

// 					setQuestion(res.data[i].question);
// 					setAnswerA(res.data[i].answerA);
// 					setAnswerB(res.data[i].answerB);
// 					setAnswerC(res.data[i].answerC);
// 					setAnswerD(res.data[i].answerD);
// 					setRealAnswer(res.data[i].rightAnswer);
// 				}
// 			});
// 	}, []);

// 	const nextQuestion = () => {
// 		setCounter(counter + 1);
// 		if (counter === 5) {
// 			setComplete(true);
// 		} else {
// 			// validation
// 			if (question && answerA && answerB && answerC && answerD && realAnswer === '') {
// 				setValidation(true);
// 			} else {
// 				var decoded = jwt_decode(localStorage.getItem('token'));
// 				const username = decoded.username;
// 				if (editQuestion.length === 0) {
// 					console.log('in save mode');
// 					axios
// 						.post('http://localhost:5000/question/save', {
// 							question: question,
// 							answerA: answerA,
// 							answerB: answerB,
// 							answerC: answerC,
// 							answerD: answerD,
// 							realAnswer: realAnswer,
// 							username: username
// 						})
// 						.then()
// 						.catch((err) => {
// 							console.log(err);
// 						});
// 					setQuestion('');
// 					setAnswerA('');
// 					setAnswerB('');
// 					setAnswerC('');
// 					setAnswerD('');
// 					setRealAnswer('');
// 				} else {
// 					//fill the textfields when we have data
// 					console.log('in update mode');
// 					// console.log(editQuestion[i]);
// 					if (i < editQuestion.length) {
// 						console.log(i);
// 						setI(i + 1);
// 						let previousQ = editQuestion[i].question;

// 						console.log('previos : ' + previousQ);

// 						// setI(i + 1);
// 						setQuestion(editQuestion[i].question);
// 						setAnswerA(editQuestion[i].answerA);
// 						setAnswerB(editQuestion[i].answerB);
// 						setAnswerC(editQuestion[i].answerC);
// 						setAnswerD(editQuestion[i].answerD);
// 						setRealAnswer(editQuestion[i].rightAnswer);

// 						// console.log(i);
// 						console.log('new   ' + question);
// 						// axios
// 						// 	.post('http://localhost:5000/question/update', {
// 						// 		previousQuestion: previousQ,
// 						// 		question: question,
// 						// 		answerA: answerA,
// 						// 		answerB: answerB,
// 						// 		answerC: answerC,
// 						// 		answerD: answerD,
// 						// 		realAnswer: realAnswer,
// 						// 		username: username
// 						// 	})
// 						// 	.then((res) => {})
// 						// 	.catch((err) => {
// 						// 		console.log(err);
// 						// 	});

// 						//update document
// 					} else {
// 						return;
// 					}
// 				}
// 			}
// 		}
// 	};

// 	function editQuestionComponent() {
// 		setComplete(false);
// 	}

// 	return (
// 		<div>
// 			{complete ? (
// 				<Complete edit={editQuestionComponent} />
// 			) : (
// 				<div className="question-wrapper">
// 					<div className="question-box">
// 						<div className="title"> Create 5 Question</div>
// 						<p> {'Question: ' + counter}</p>
// 						<div className="register-from">
// 							<div className="question-input">
// 								<TextField
// 									fullWidth
// 									id="standard-basic"
// 									label="Add"
// 									variant="standard"
// 									value={question}
// 									onChange={(e) => setQuestion(e.target.value)}
// 								/>
// 							</div>
// 							<div className="answer-wrapper">
// 								<div className="answers-group">
// 									<TextField
// 										size="small"
// 										variant="outlined"
// 										id="outlined-basic"
// 										label="A"
// 										value={answerA}
// 										onChange={(e) => setAnswerA(e.target.value)}
// 									/>
// 									<div> </div>
// 									<TextField
// 										size="small"
// 										variant="outlined"
// 										id="outlined-basic"
// 										label="B"
// 										value={answerB}
// 										onChange={(e) => setAnswerB(e.target.value)}
// 									/>
// 								</div>
// 								<div className="answers-group">
// 									<TextField
// 										size="small"
// 										variant="outlined"
// 										id="outlined-basic"
// 										label="C"
// 										value={answerC}
// 										onChange={(e) => setAnswerC(e.target.value)}
// 									/>
// 									<TextField
// 										size="small"
// 										variant="outlined"
// 										id="outlined-basic"
// 										label="D"
// 										value={answerD}
// 										onChange={(e) => setAnswerD(e.target.value)}
// 									/>
// 								</div>
// 							</div>

// 							<div className="footer">
// 								{/* // footer */}

// 								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
// 									<InputLabel id="demo-simple-select-standard-label">your Answere</InputLabel>
// 									<Select
// 										labelId="demo-simple-select-standard-label"
// 										id="demo-simple-select-standard"
// 										value={realAnswer}
// 										label="select Answere"
// 										onChange={(e) => setRealAnswer(e.target.value)}
// 									>
// 										<MenuItem value={'A'}>A</MenuItem>
// 										<MenuItem value={'B'}>B</MenuItem>
// 										<MenuItem value={'C'}>C</MenuItem>
// 										<MenuItem value={'D'}>D</MenuItem>
// 									</Select>
// 								</FormControl>
// 								<Button
// 									onClick={nextQuestion}
// 									variant="outlined"
// 									endIcon={<SendIcon />}
// 									style={{ marginTop: '10px' }}
// 								>
// 									Next
// 								</Button>
// 							</div>
// 						</div>
// 						{validation ? (
// 							<div className="error-register">
// 								<p> Fill the inputs</p>
// 							</div>
// 						) : (
// 							''
// 						)}
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Question;
