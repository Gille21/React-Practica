import { useEffect, useState } from 'react';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Link } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    //Valida la creación de usuario e ingresa de una vez
    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/portalHome');
        }
    }, []);

    //Resetea el formulario
    const resetForm = () => {
        setUsername('');
        setPassword('');
        setPassword2('');
    };

    //Submit del formulro
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await register(username, password, password2);
        if (error) {
            alert(JSON.stringify(error));
        } else {
            navigate('/portalHome');
            resetForm();
        }
    };

    return (
        <section className='section-login'>
            <center>
                <div className="form-container-login">
                    <h1 className='title'>Register</h1>
                        <form className='form-login' onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" id="username" className='form-control' onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
                            </div>
                            <div className="mb-3">
                                <input type="password" id="password" className='form-control' onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                            </div>
                            <div className="mb-3">
                                <input type="password" id="confirm-password" className='form-control' onChange={(e) => setPassword2(e.target.value)} placeholder="Confirm Password" required />
                                <p> {password2 !== password ? 'Passwords do not match' : ''} </p>
                            </div>
                            <div className="mb-3">
                                            <label htmlFor="" className="form-label">you already have account? <Link to="../views/login">sing up</Link></label>
                                        </div>
                            <button className='form-btn-login' type="submit">Register</button>
                        </form>
                    </div>
            </center>
        </section>
    );
}

export default Register;
