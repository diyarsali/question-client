import React, { useState, useEffect } from "react";
import ResultChild from "./ResultChild";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import '../css/answer.css';

import axios from "../../axios.js";
import jwtDecode from "jwt-decode";

const spanStyles = {
  width: "100%",
  height: " 80vh",
  overflow: "scroll",
  padding: "8px",
  boxSizing: "border-box",
};
const progressStyles = {
  width: "100%",
  height: " 80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",
  boxSizing: "border-box",
};
const Result = () => {
  // const username = jwtDecode(localStorage.getItem('token')).username;
  // const username = 'diyar';
  const [arrResult, setArrResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const username = jwtDecode(localStorage.getItem("token")).username;
      axios
        .post("result/getResultToResult", {
          username: username,
        })
        .then((res) => {
          setIsLoading(false);
          setArrResult(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  // console.log(arrResult);

  if (isLoading) {
    return (
      <div style={progressStyles}>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  } else if (arrResult.length !== 0) {
    return (
      <div style={spanStyles}>
        <ResultChild data={arrResult} />
      </div>
    );
  } else {
    // console.log(arrResult);
    return (
      <div style={spanStyles}>
        <div className="lert-wrapper">
          <div className="lert-box">
            <div className="alert-warning">
              <p>there is no result</p>
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
};

export default Result;
