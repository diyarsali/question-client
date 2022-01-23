import axios from "axios";

const instance = axios.create({
  baseURL: "https://questions-server.herokuapp.com/",
  // baseURL: "http://localhost:8000/",
});
export default instance;
