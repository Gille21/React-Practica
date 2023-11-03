import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Styles/resultados.css';
import './Styles/bootstrap.min.css';

function Resultado() {
  const location = useLocation();
  const productosFiltrados = location.state.productosFiltrados || [];

  return (
    <div>
      <Link
        to="/formulario"
        className="btn btn-outline-dark view-button back-button"
      >
        Volver al Formulario
      </Link>

      <div className="card-container">
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {productosFiltrados.map((producto, index) => (
                <div className="col mb-5" key={index}>
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img
                        className="product-image"
                        src={producto.img}
                        alt={producto.modelo}
                        onLoad={() =>
                          console.log(`Imagen cargada: ${producto.img}`)
                        }
                        onError={() =>
                          console.log(
                            `Error al cargar la imagen: ${producto.img}`
                          )}
                        />
                      <div className="text-center">
                        <h5 className="fw-bolder">{producto.modelo}</h5>
                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">{producto.tipo}</span>
                          <span className="fw-bold">{producto.proposito}</span>
                        </div>
                        <p className="mt-3">COP {producto.presupuesto}</p>
                        <p>{producto.marca}</p>
                        <p>{producto.disco}</p>
                      </div>
                    </div>

                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <Link to={`/producto/${producto.id_computer}`}>
                          <button className="btn btn-outline-dark view-button">
                            View Options
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Resultado;
