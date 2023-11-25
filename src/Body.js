import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Button } from "react-bootstrap";
import "./Styles/Body.css";
import logoImage from "./img/PC_EXPRESS.png"; // Ruta de la imagen

function Body() {
  return (
    <div>
      {/* Sección 1 - Sobre Nosotros con botón */}
      <section className="bg-success py-5">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1>BIENVENIDO A PCEXPRESS</h1>
              <p>
                Comprendemos que la elección de un nuevo computador puede ser
                abrumadora. Estamos aquí para facilitarlo. Con nuestra página,
                la decisión podrá ser más fácil.
              </p>
              {/* Botón redirige a /formulario */}
              <Link to="/formulario">
                <Button variant="primary" className="btn-success">
                  ¡VAMOS AL FORMULARIO!
                </Button>
              </Link>
            </div>
            <div className="col-md-4">
              <img
                src={logoImage}
                alt="About Hero"
                className="about-hero-image"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Body;
