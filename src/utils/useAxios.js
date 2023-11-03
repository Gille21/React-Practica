import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth';
import { API_BASE_URL  } from './constants';
import Cookies from 'js-cookie';

//Hacemos uso del axios, es decir la apiInstance del axios.js
const useAxios = () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    //Configuramos la api
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    //Aca hace uso del axiosInstance y valida siempre el token
    axiosInstance.interceptors.request.use(async (req) => {
        if (!isAccessTokenExpired(accessToken)) return req;

        const response = await getRefreshToken(refreshToken);

        setAuthUser(response.access, response.refresh);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    console.log(axiosInstance);

    return axiosInstance;
};

export default useAxios;
