import { useEffect } from 'react';
import { LoggedOutView } from './home';
import { logout } from '../utils/auth';

//Llama la funcion en la cual quita las cookies y reinicia la sesión 
const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return <LoggedOutView title="Has cerrado sesión" />;
};

export default Logout;