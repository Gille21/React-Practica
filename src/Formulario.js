import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './Styles/formulario.css';
import {consulta} from './crud/compu.api';

function Formulario() {
  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit(async e => {
    // Mostrar los datos que se enviarán al servidor
    console.log('Datos a enviar:', e);
    const response =await consulta(e);
    console.log(response.data);
    const data = response.data;
    navigate('/resultados', { state: { productosFiltrados: data } });
  })

  return (
    <div className="form-container">
      <h1>Formulario de Selección de Computadora</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="proposito">¿Para qué vas a usar la computadora?</label>
          <select
            id="proposito"
            className="custom-select"
            {...register('proposito',{required: true})}
          >
            <option value="">Selecciona una opción</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Gamer">Gamer</option>
            <option value="Entretenimiento">Entretenimiento</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="marca">¿Tienes alguna preferencia por la marca de la computadora?</label>
          <select
            id="marca"
            className="custom-select"
            {...register('marca',{required: true})}
          >
            <option value="">Selecciona una opción</option>
            <option value="Apple">Apple</option>
            <option value="Razer">Razer</option>
            <option value="HP">HP</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sistemaOperativo">¿Tienes algún sistema operativo en mente que prefieras?</label>
          <select
            id="sistemaOperativo"
            className="custom-select"
            {...register('sistema_operativo',{required: true})}
          >
            <option value="">Selecciona una opción</option>
            <option value="Windows 11 Home">Windows 11 Home</option> {/* Modifica el valor aquí */}
            <option value="Mac">Mac</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className= "form-group">
          <label htmlFor="capDisco">¿Qué capacidad de disco necesitas?</label>
          <select
            id="capDisco"
            className="custom-select"
            {...register('cap_disco',{required: true})}
          >
            <option value="">Selecciona una opción</option>
            <option value="512 GB">512 GB</option> {/* Modifica el valor aquí */}
            <option value="1.5 TB">1.5 TB</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tipComputador">¿Prefieres una laptop o una computadora de escritorio?</label>
          <select
            id="tipComputador"
            className="custom-select"
            {...register('tip_computador',{required: true})}
          >
            <option value="">Selecciona una opción</option>
            <option value="Portatil">Portatil</option>
            <option value="Escritorio">Escritorio</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="presupuesto">¿Cuál es tu presupuesto aproximado?</label>
          <input
            type="text" // Cambiar el tipo a texto
            id="presupuesto"
            className="custom-input"
            // {...register('presupuesto',{required: true})}
          />
        </div>
        <button>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
