import React from 'react';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <div>
      {/* Aquí defines tu grid y otros elementos del cuerpo */}
      <div className="grid-container">
        {/* Contenido del grid */}
      </div>

      {/* Botón "Ir a Formulario" */}
      <Link to="/formulario">
        <button>Ir a Formulario</button>
      </Link>
    </div>
  );
}

export default Body;
