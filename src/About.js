import React from 'react';
import './Styles/About.css';
import laptopImage from './img/LAPTOP.png'; // Ruta de la imagen
import serviceImage from './img/PC_EXPRESS.png'; // Ruta de la imagen
import teamImage from './img/UCENTRAL.png'; // Ruta de la imagen

function About() {
  return (
    <div>
      <section className="bg-success py-5">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8 text-white">
              <h1>Sobre Nosotros</h1>
              <p>
                Somos un proyecto creado a partir de la incertidumbre de las personas que no conocen tanto del mundo 
                de los equipos de cómputo.
              </p>
            </div>
            <div className="col-md-4">
              <img src={laptopImage} alt="About Hero" className="about-hero-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row text-center pt-5 pb-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Nuestra Meta</h1>
            <p>
              Nuestra meta es que con nosotros puedas encontrar el equipo de cómputo perfecto para ti.
            </p>
            <img src={serviceImage} alt="Service Image" className="about-service-image" /> {/* Aquí se puede agregar la imagen de Servicio */}
          </div>
        </div>
        <div className="row">
          {/* Agrega aquí tu contenido adicional */}
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container my-4">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Nuestro Equipo</h1>
              <p>
                Somos cuatro estudiantes de Ingeniería en Sistemas realizando este proyecto para la materia
                Práctica de Ingeniería IV.
              </p>
              <img src={teamImage} alt="Team Image" /> {/* Aquí se puede agregar la imagen del Equipo */}
            </div>
            <div className="col-lg-9 m-auto tempaltemo-carousel">
              <div className="row d-flex flex-row">
                {/* Agrega aquí tu contenido adicional */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
