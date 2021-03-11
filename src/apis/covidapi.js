import axios from "axios";

export default covidapi = axios.create({
    baseURL: 'https://covidapi.info/api/v1'
});