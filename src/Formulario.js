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
    setShowEstudiosRamaOptions(value === 'pregrado');
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
              {...register('nivelEstudios')}
              onChange={(e) => { setValue('nivelEstudios', e.target.value); handleEstudiosNivelChange(e.target.value); }}
              defaultValue="vacio"  
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="primaria">Primaria</option>
              <option value="bachiller">Bachiller</option>
              <option value="posgrado">Universidad Posgrado</option>
              <option value="pregrado">Universidad Pregrado</option>
            </select>
          </div>
        )}

        {showEstudiosRamaOptions && (
          <div className="form-group">
            <label htmlFor="ramaEstudios">¿En qué Rama de Estudios te enfocas?</label>
            <select
              id="ramaEstudios"
              className="custom-select"
              {...register('ramaestudios')}
              defaultValue="vacio"  
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="ingenieria">Ingeniería</option>
              <option value="artes">Artes</option>
              <option value="cienciasbasicas">Ciencias Básicas</option>
              <option value="empresarial">Ciencias Empresariales</option>
              <option value="publicidad">Publicidad</option>
            </select>
          </div>
        )}

        {showTrabajoOptions && (
          <div className="form-group">
            <label htmlFor="areaTrabajo">¿En qué Área te desempeñas?</label>
            <select
              id="areatrabajo"
              className="custom-select"
              {...register('areatrabajo')}
              onChange={(e) => { setValue('areatrabajo', e.target.value); handleTrabajoAreaChange(e.target.value); }}
              defaultValue="vacio"   
            >
              <option value="vacio" disabled>Selecciona una opción</option>
              <option value="ingenieria">Ingeniería</option>
              <option value="administracion">Administración</option>
              <option value="contaduria">Contaduría</option>
              <option value="literaria">Creación Literaria</option>
              <option value="ciencias">Ciencias a fines (Biología, Física, Química)</option>
              <option value="diseñografico">Diseño Gráfico</option>
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
            defaultValue="vacio" 
          >
            <option value="vacio" disabled>Selecciona una opción</option>
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