import axios from 'axios';

const API_KEY = import.meta.env.VITE_APP_SECRET_KEY;
const headers = { 'x-apikey': API_KEY };



export const getData = () => {
    return axios.get('https://touchinspiration-0ada.restdb.io/rest/sample', { headers });
}

export const patchData = (id, data) => {
    return axios.patch(`https://touchinspiration-0ada.restdb.io/rest/sample/${id}`, data, { headers });
}