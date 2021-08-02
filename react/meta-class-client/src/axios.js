import Axios from "axios";

export const axios = Axios.create({
    baseURL : "http://localhost:8080",
    headers: { Auth: "Simple AUTH" },
    timeout: 3000, 
});