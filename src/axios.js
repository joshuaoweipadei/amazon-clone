import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL   // 'http://localhost:5001/clone-253e4/us-central1/api'
});

export default instance;