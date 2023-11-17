import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Styles/formulario.css';
import { consulta } from './crud/compu.api';

function Formulario() {
  const navigate = useNavigate();
  const [showEstudiosOptions, setShowEstudiosOptions] = useState(false);
  const [showEstudiosRamaOptions, setShowEstudiosRamaOptions] = useState(false);
  const [showTrabajoOptions, setShowTrabajoOptions] = useState(false);
  const [showTrabajoAreaOptions, setShowTrabajoAreaOptions] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const propostoValue = watch('proposito');

  const onSubmit = handleSubmit(async e => {
    // Mostrar los datos que se enviarán al servidor
    console.log('Datos a enviar:', e);

    // Establecer valores por defecto 'Sin especificar' si no se selecciona nada
    const nivelEstudios = e.nivel_estudios || 'Sin especificar';
    const ramaEstudios = e.rama_estudios || 'Sin especificar';
    const areaTrabajo = e.area_trabajo || 'Sin especificar';

    // Construir el objeto de datos a enviar
    const datosEnviar = {
      ...e,
      nivel_estudios: nivelEstudios,
      rama_estudios: ramaEstudios,
      area_trabajo: areaTrabajo,
    };

    const response = await consulta(datosEnviar);
    console.log(response.data);
    const data = response.data;
    navigate('/resultados', { state: { productosFiltrados: data } });
  });

  const handlePropositoChange = (value) => {
    setShowEstudiosOptions(value === 'Estudios');
    setShowTrabajoOptions(value === 'Trabajo');
    setShowTrabajoAreaOptions(false); // Asegurarse de que el bloque adicional no se muestre por defecto
  };

  const handleEstudiosNivelChange = (value) => {
    setShowEstudiosRamaOptions(value === 'Universidad-Pregrado');
  };

  const handleTrabajoAreaChange = (value) => {
    setShowTrabajoAreaOptions(value === 'Ingenieria');
  };

  return (
    <div className="form-container">
      <h1>Formulario de Selección de Computadora</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="proposito">¿Para qué vas a usar la computadora?</label>
          <select
            id="proposito"
            className="custom-select"
            {...register('proposito', { required: true })}
            onChange={(e) => { setValue('proposito', e.target.value); handlePropositoChange(e.target.value); }}
            defaultValue="vacio"  
          >
            <option value="vacio" disabled>Selecciona una opción</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Gamer">Gamer</option>
            <option value="Entretenimiento">Entretenimiento</option>
            <option value="Estudios">Estudios</option>
          </select>
        </div>

        {showEstudiosOptions && (
          <div className="form-group">
            <label htmlFor="nivelEstudios">¿Qué Nivel de Estudios te encuentras?</label>
            <select
              id="nivelEstudios"
              className="custom-select"
              {...register('nivel_estudios')}
              onChange={(e) => { setValue('nivel_estudios', e.target.value); handleEstudiosNivelChange(e.target.value); }}
              defaultValue="vacio"  
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="Primaria">Primaria</option>
              <option value="Bachiller">Bachiller</option>
              <option value="Universidad-Posgrado">Universidad Posgrado</option>
              <option value="Universidad-Pregrado">Universidad Pregrado</option>
            </select>
          </div>
        )}

        {showEstudiosRamaOptions && (
          <div className="form-group">
            <label htmlFor="ramaEstudios">¿En qué Rama de Estudios te enfocas?</label>
            <select
              id="ramaEstudios"
              className="custom-select"
              {...register('rama_estudios')}
              defaultValue="vacio"  
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="Ingeniería y Ciencias Básicas">Ingeniería y Ciencias Básicas</option>
              <option value="Artes">Artes</option>
              <option value="Ciencias Empresariales y Jurídicas">Ciencias Empresariales y Jurídicas</option>
              <option value="Estratégica y Publicidad">Estratégica y Publicidad</option>
            </select>
          </div>
        )}

        {showTrabajoOptions && (
          <div className="form-group">
            <label htmlFor="areaTrabajo">¿En qué Área te desempeñas?</label>
            <select
              id="areaTrabajo"
              className="custom-select"
              {...register('area_trabajo')}
              onChange={(e) => { setValue('area_trabajo', e.target.value); handleTrabajoAreaChange(e.target.value); }}
              defaultValue="vacio"   
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="Ingenieria">Ingeniería</option>
              <option value="Administracion">Administración</option>
              <option value="Contaduria">Contaduría</option>
              <option value="Creacion Literaria">Creación Literaria</option>
              <option value="Ciencias a fines">Ciencias a fines (Biología, Física, Química)</option>
              <option value="Diseño Grafico">Diseño Gráfico</option>
            </select>
          </div>
        )}

        {/* No se muestra ningún bloque adicional para "Ingeniería" en el trabajo */}
        
        <div className="form-group">
          <label htmlFor="tipComputador">¿Prefieres una laptop o una computadora de escritorio?</label>
          <select
            id="tipComputador"
            className="custom-select"
            {...register('tip_computador', { required: true })}
            defaultValue="Sin Especificar"  
          >
            <option value="Sin Especificar" disabled>Sin Especificar</option>
            <option value="Portatil">Portátil</option>
            <option value="Escritorio">Escritorio</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="presupuesto">¿Cuál es tu presupuesto aproximado?</label>
          <input
            type="text"
            id="presupuesto"
            className="custom-input"
            {...register('presupuesto', { required: true })}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;