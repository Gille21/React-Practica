import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Styles/bootstrap.min.css';

function Producto() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `http://www.impulsotemporal.com/api/api/computers/${id}/`;
    const auth = {
      username: 'samuel',
      password: 'samuel159',
    };

    axios
      .get(apiUrl, { auth })
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.img} alt={product.modelo} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.modelo}</h2>
          <p>Tipo: {product.tip_computador}</p>
          <p>Marca: {product.marca}</p>
          <p>Memoria RAM: {product.cap_memoria} {product.tip_memoria}</p>
          <p>Disco Duro: {product.cap_disco} {product.tip_disco}</p>
          <p>Gráficos: {product.tip_grafica} ({product.cap_grafica})</p>
          <p>Procesador: {product.procesador} ({product.vel_procesador})</p>
          <p>Sistema Operativo: {product.sistema_operativo}</p>
          <p>Precio: COP {product.costo}</p>
          <p>Propósito: {product.proposito}</p>
          <div>
            <Link to="/shop" className="btn btn-primary">Volver a la Tienda</Link>
          </div>

          <div>
            <a href={product.tienda} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Comprar en la Tienda</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
