import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

//Constante home obtiene los estados de si estan logueados y se obtiene el usuario.
const Home = () => {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);
    console.log('Esta logeado y cual es su usuario?',isLoggedIn,user)
    return (
        <div>
            {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
        </div>
    );
};

//AAca realiza la validación a la hora de ingresar tenga la sesión del login, que vista mostrar
const LoggedInView = ({ user }) => {
    return (
        <center>
                <h1>Bienvenido {user.username}</h1>
                <br>
                </br>
                <br>
                </br>
                <div className='container'>
                    <div className='row'>
                        <div className="col-md-12">
                            <Link to="/crud/ccompu">
                            <button className='form-btn-login'>Agregar Producto</button>
                            </Link>
                        </div>
                    </div>
                </div>
        </center>
    );
};

export const LoggedOutView = ({ title = 'Home' }) => {
    return (
        <center>
            <h1>{title}</h1>
            <br>
            </br>
            <br>
            </br>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/">
                            <button className='form-btn-login'>Cotinue</button>
                        </Link>
                    </div>
                </div>
                </div>
        </center>
    );
};

export default Home;