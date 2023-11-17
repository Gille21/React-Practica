import { useEffect, useState } from 'react';
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    //Valida si esta logeado
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/portalHome');
        }
    }, []);

    //Resetea el formulario
    const resetForm = () => {
        setUsername('');
        setPassword('');
    };

    //Esta es la propiedad del submit para el formulario de Login
    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await login(username, password);
        console.log('Estos son los datos del formulario del login'+ e);
        if (error) {
            alert(error);
        } else {
            navigate('/portalHome');
            resetForm();
        }
    };
    
    const volver = async => {
        navigate('/');
        resetForm();
        
    };
    return (
        <section className='section-login'>
            <center>
                <div className="form-container-login">
                <h1 className='title'>Login</h1>
                    <form className='form-login' onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <input type="text" id="username" className='form-control' name="username" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <input type="password" id="password" className='form-control' name="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                                        <label htmlFor="" className="form-label">you don't have account? <Link className='Link-label'  to="../views/register">register</Link></label>
                                    </div> 
                        <button className='form-btn-login' type="submit">Login</button>
                        <button className='form-btn-login-2' onClick={volver}>Volver</button>
                    </form>
                </div>
            </center>  
        </section>        
    );
};

export default Login;
