import axios from 'axios';

//Se crea una instancia de la api de autenticación y su configuración
const apiInstance = axios.create({
    baseURL: 'http://www.impulsotemporal.com/api/api_auth/',
    timeout: 5000, // timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
