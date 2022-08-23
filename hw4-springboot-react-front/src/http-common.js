import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8080/api/HW4/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});