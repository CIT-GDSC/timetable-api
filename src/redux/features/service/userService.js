

import axios from 'axios';

const getUsers = async () => {
    const config = {
        headers: {
            'x-apikey': "63be7360969f06502871ad7f"
        }
    }
    const getData = await axios.get("https://touchinspiration-0ada.restdb.io/rest/sample", config)
    return getData.data
}

const patchata = async (id, data) => {
    const response = await axios.patch(`https://touchinspiration-0ada.restdb.io/rest/sample/${id}`, data, {
        headers: {
            'x-apikey': "63be7360969f06502871ad7f"
        }
    })
    return response.data
}

const userFunction = {
    getUsers,
    patchata
}

export default userFunction



// import axios from 'axios';

// const API_KEY = import.meta.env.VITE_APP_SECRET_KEY;
// const headers = { 'x-apikey': API_KEY };



// export const getData = () => {
//     return axios.get('https://touchinspiration-0ada.restdb.io/rest/sample', { headers });
// }

// export const patchData = (id, data) => {
//     return axios.patch(`https://touchinspiration-0ada.restdb.io/rest/sample/${id}`, data, { headers });
// }