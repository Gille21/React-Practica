import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Comparador from './Comparador'; // Importa el componente Comparador

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    type: 'all',
    purpose: 'all',
  });

  const auth = {
    username: 'samuel',
    password: 'samuel159',
    };

  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para rastrear productos seleccionados

  useEffect(() => {
    const apiUrl = 'http://www.impulsotemporal.com/api/api/computers/';

    axios
      .get(apiUrl, {auth})
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleCompare = (product) => {
    if (selectedProducts.some((p) => p.id_computer === product.id_computer)) {
      const updatedList = selectedProducts.filter((p) => p.id_computer !== product.id_computer);
      setSelectedProducts(updatedList);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };
  

  const filteredProducts = products.filter((product) => {
    if (
      (filters.type === 'all' || product.tip_computador === filters.type) &&
      (filters.purpose === 'all' || product.proposito === filters.purpose)
    ) {
      return true;
    }
    return false;
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="shop">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="h2 pb-4">Categorías</h1>
            <ul className="list-unstyled templatemo-accordion">
              {/* Agregar filtros de tipo y propósito */}
              <li className="pb-3">
                <h3>Filtrar por Tipo</h3>
                <ul className="list-unstyled pl-3">
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="all"
                        checked={filters.type === 'all'}
                        onChange={() => setFilters({ ...filters, type: 'all' })}
                      />
                      Todos
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Portatil"
                        checked={filters.type === 'Portatil'}
                        onChange={() => setFilters({ ...filters, type: 'Portatil' })}
                      />
                      Portátil
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="type"
                        value="Escritorio"
                        checked={filters.type === 'Escritorio'}
                        onChange={() => setFilters({ ...filters, type: 'Escritorio' })}
                      />
                      Escritorio
                    </label>
                  </li>
                </ul>
              </li>
              <li className="pb-3">
                <h3>Filtrar por Propósito</h3>
                <ul className="list-unstyled pl-3">
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="all"
                        checked={filters.purpose === 'all'}
                        onChange={() => setFilters({ ...filters, purpose: 'all' })}
                      />
                      Todos
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="Gamer"
                        checked={filters.purpose === 'Gamer'}
                        onChange={() => setFilters({ ...filters, purpose: 'Gamer' })}
                      />
                      Gamer
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="Trabajo"
                        checked={filters.purpose === 'Trabajo'}
                        onChange={() => setFilters({ ...filters, purpose: 'Trabajo' })}
                      />
                      Trabajo
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        name="purpose"
                        value="Entretenimiento"
                        checked={filters.purpose === 'Entretenimiento'}
                        onChange={() => setFilters({ ...filters, purpose: 'Entretenimiento' })}
                      />
                      Entretenimiento
                    </label>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-lg-9">
            <div className="row">
              {filteredProducts.map((product) => (
                <div key={product.id_computer} className="col-md-4">
                  <div className="card mb-4 product-wap rounded-0">
                    <div className="card rounded-0">
                      <img className="card-img rounded-0 img-fluid" src={product.img} alt={product.modelo} />
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{product.modelo}</h2>
                      <p className="card-text">Tipo: {product.tip_computador}</p>
                      <p className="card-text">Propósito: {product.proposito}</p>
                      <p className="card-text">{`COP ${product.costo}`}</p>

                      <button
                        className={selectedProducts.some((p) => p.id_computer === product.id_computer) ? 'btn btn-primary selected' : 'btn btn-primary'}
                        onClick={() => handleCompare(product)}
                      >
                        {selectedProducts.some((p) => p.id_computer === product.id_computer) ? 'Quitar de Comparación' : 'Comparar'}
                      </button>

                      <Link to={`/producto/${product.id_computer}`}>
                        <button className="btn btn-primary">View Option</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar el componente Comparador si hay productos seleccionados */}
      {selectedProducts.length >= 2 && <Comparador selectedProducts={selectedProducts} />}
    </div>
  );
}

export default Shop;