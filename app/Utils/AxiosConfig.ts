import axios from 'axios'


const baseQueryParams = {
    apikey: process.env.key,
    hash: process.env.hash,
    ts: process.env.ts
}


const api = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
});

axios.defaults.params = baseQueryParams;


export { api };