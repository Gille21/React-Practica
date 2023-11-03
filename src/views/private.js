import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../utils/useAxios';

const Private = () => {
    const [res, setRes] = useState('');
    const [posRes, setPostRes] = useState('');
    const api = useAxios();

    //Valida que en el test tenga la autenticación enviada
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/test/');
                setRes(response.data.response);
            } catch (error) {
                setPostRes(error.response.data);
            }
        };
        fetchData();
    }, []);

    //Este es el form de submit el cual se le envia un texto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/test/', {
                text: e.target[0].value,
            });
            setPostRes(response.data.response);
        } catch (error) {
            setPostRes(error.response.data);
        }
    };
    
    return (
        <section>
            <h1>Private</h1>
            <p>{res}</p>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Text" />
                <button type="submit">Submit</button>
            </form>
            <div className="mb-3">
                <Link to='/portalHome'>
                    <button>Volver</button>
                </Link>
            </div>
            {posRes && <p>{posRes}</p>}
        </section>
    );
};

export default Private;
