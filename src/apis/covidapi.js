import axios from "axios";

export const covidapi = axios.create({
    baseURL: 'https://covidapi.info/api/v1'
});