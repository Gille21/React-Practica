import { useAuthStore } from '../store/auth';
import axios from './axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

// creamos una constante que se exportara, donde realizamos la autenticación del login de usuarios por su token
export const login = async (username, password) => {
    try {
        const { data, status } = await axios.post('token/', {
            username,
            password,
        });
        if (status === 200) {
            setAuthUser(data.access, data.refresh);
        }
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || 'Algo salió mal.',
        };
    }
};

//Creamos una constante que se exportara donde se realiza la autenticación a la hora de registrarse con su token respectivo
export const register = async (username, password, password2) => {
    try {
        const { data } = await axios.post('register/', {
            username,
            password,
            password2,
        });
        //Inicia sesión de inmediato con el token autenticado
        await login(username, password);
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data || 'Algo salió mal.',
        };
    }
};

/*Creamos una constante que se exportará donde realiza la eliminación de los tokens de la sesión correspondiente a su vez obtiene el estado del almacenamiento 
de las autenticaciones e indica que el usuario ya no esta en tal almacenamiento*/
export const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    useAuthStore.getState().setUser(null);
};

//Creamos una constante que se exportará con la asignación del usuario
export const setUser = async () => {
    // Cada vez que la pagina carga
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');
    if (!accessToken || !refreshToken) {
        return;
    }
    //Valida si el token de la sesión ya expiro
    if (isAccessTokenExpired(accessToken)) {
        //Obtiene un token nuevo y se reasigna al usuario
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

//Asigna la autentiocación del usuario tomando los tokens
export const setAuthUser = (access_token, refresh_token) => {
    //Le asigna en las cabeceras, el token que se obtiene a la hora de ingresar o registrar
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true,
    });

    Cookies.set('refresh_token', refresh_token, {
        expires: 7,
        secure: true,
    });

    //Decodifica el token y guarda el nombre de usuario
    const user = jwt_decode(access_token) ?? null;

    console.log('Este fue el usuario que mando: ' + user);
    //Valida si hay usuario o no 
    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

//Obtiene el refresh token en caso de que no se encuentre valido el accept token
export const getRefreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    const response = await axios.post('token/refresh/', {
        refresh: refresh_token,
    });
    return response.data;
};

//Valida si el token de acceso ha expirado
export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwt_decode(accessToken);
        console.log('este es el token decodificado:' + decodedToken)
        return decodedToken.exp < Date.now() / 1000;
    } catch (err) {
        return true; // Token is invalid or expired
    }
};
