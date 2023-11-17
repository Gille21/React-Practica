import React, { useState } from 'react';
import './Styles/Comaprador.css';

function Comparador(props) {
  const { selectedProducts } = props;

  const prom = 0;

  const parametrosRanking = [
    {
      nombre: 'costos',
      lista: selectedProducts.map((computer) => parseInt(computer.costo)),
      umbralAlto: Math.max(...selectedProducts.map((computer) => parseInt(computer.costo))),
      umbralBajo: Math.min(...selectedProducts.map((computer) => parseInt(computer.costo))),
    },
    {
      nombre: 'cap_memoria',
      lista: selectedProducts.map((computer) => parseInt(computer.cap_memoria)),
      umbralAlto: Math.max(...selectedProducts.map((computer) => parseInt(computer.cap_memoria))),
      umbralBajo: Math.min(...selectedProducts.map((computer) => parseInt(computer.cap_memoria))),
    },
    {
      nombre: 'cap_disco',
      lista: selectedProducts.map((computer) => {
        const capacidad = computer.cap_disco;
        if (typeof capacidad === 'string' && capacidad.includes('TB')) {
          return parseFloat(capacidad) * 1024; // Convertir TB a GB
        } else {
          return parseFloat(capacidad);
        }
      }),
      umbralAlto: Math.max(
        ...selectedProducts.map((computer) => {
          const capacidad = computer.cap_disco;
          if (typeof capacidad === 'string' && capacidad.includes('TB')) {
            return parseFloat(capacidad) * 1024; // Convertir TB a GB
          } else {
            return parseFloat(capacidad);
          }
        })
      ),
      umbralBajo: Math.min(
        ...selectedProducts.map((computer) => {
          const capacidad = computer.cap_disco;
          if (typeof capacidad === 'string' && capacidad.includes('TB')) {
            return parseFloat(capacidad) * 1024; // Convertir TB a GB
          } else {
            return parseFloat(capacidad);
          }
        })
      ),
    },
    {
      nombre: 'cap_grafica',
      lista: selectedProducts.map((computer) => parseInt(computer.cap_grafica)),
      umbralAlto: Math.max(...selectedProducts.map((computer) => parseInt(computer.cap_grafica))),
      umbralBajo: Math.min(...selectedProducts.map((computer) => parseInt(computer.cap_grafica))),
    },
    {
      nombre: 'vel_procesador',
      lista: selectedProducts.map((computer) => parseInt(computer.vel_procesador)),
      umbralAlto: Math.max(...selectedProducts.map((computer) => parseInt(computer.vel_procesador))),
      umbralBajo: Math.min(...selectedProducts.map((computer) => parseInt(computer.vel_procesador))),
    }
  ];

  const clasificarProducto = (nombre, valor, umbralAlto, umbralBajo) => {
    switch (nombre) {
      case 'costos':
        if (valor === umbralAlto && valor === umbralBajo) {
          return '⚖️';
        }
        else if (valor > umbralBajo && valor < umbralAlto) {
          return '⚖️'; // Neutro
        }
        else if (valor <= umbralBajo) {
          return '✅'; // Mejor
        }
        else {
          return '❌'; // Peor
        }
      default:
        if (valor === umbralAlto && valor === umbralBajo) {
          return '⚖️';
        }
        else if (valor > umbralBajo && valor < umbralAlto) {
          return '⚖️';
        }
        else if (valor >= umbralAlto) {
          return '✅';
        }
        else {
          return '❌';
        }
    }
};

  // Función para contar el símbolo de mejor
  const contarMejor = (parametrosRanking,simbolos) => {
    const porcentajeSimbolos = simbolos.filter((simbolo) => simbolo === '✅').length;
    return (porcentajeSimbolos*100)/parametrosRanking+'%';
  };

  return (
    <div className="comparador">
      <h1>Especificaciones técnicas</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Computador</th>
              {selectedProducts.map((computer) => (
                <th key={computer.id_computer}>
                  {computer.modelo}
                  <br />
                  <img src={computer.img} alt={computer.modelo} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedProducts.length > 0 &&  (
              <>
                <tr>
                  <th>Propósito</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.proposito}</td>
                  ))}
                </tr>
                <tr>
                  <th>Marca</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.marca}</td>
                  ))}
                </tr>
                <tr>
                  <th>Costo</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{`COP ${computer.costo}`}</td>                                      
                  ))}               
                </tr>
                <tr>
                  <th>Tipo de Memoria</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.tip_memoria}</td>
                  ))}
                </tr>
                <tr>
                  <th>Capacidad de Memoria</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.cap_memoria}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Puntaje de Memoria</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>
                      {computer.put_memoria !== null ? computer.put_memoria : 'No hay información'}</td>
                  ))}
                </tr>
                <tr>
                  <th>Tipo de Disco</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.tip_disco}</td>
                  ))}
                </tr>
                <tr>
                  <th>Capacidad de Disco</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.cap_disco}</td>
                  ))}
                </tr>
                <tr>
                  <th>Puntaje del Disco</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>
                      {computer.put_disco !== null ? computer.put_disco : 'No hay información'}</td>
                  ))}
                </tr>
                <tr>
                  <th>Tarjeta Gráfica</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>
                      {computer.grafica !== true ? computer.grafica  : 'SI'}</td>
                  ))}
                </tr>
                <tr>
                  <th>Tipo de Tarjeta Gráfica</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.tip_grafica}</td>
                  ))}
                </tr>
                <tr>
                  <th>Capacidad de Tarjeta Gráfica</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.cap_grafica}</td>
                  ))}
                </tr>
                <tr>
                  <th>Puntaje Tarjeta Gráfica</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>
                      {computer.put_grafica !== null ? computer.put_grafica : 'No hay información'}</td>
                  ))}
                </tr>
                <tr>
                  <th>Procesador</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.procesador}</td>
                  ))}
                </tr>
                <tr>
                  <th>Velocidad de Procesador</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.vel_procesador}</td>
                  ))}
                </tr>
                <tr>
                  <th>Puntaje Procesador</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.put_procesador}</td>
                  ))}
                </tr>
                <tr>
                  <th>Sistema Operativo</th>
                  {selectedProducts.map((computer) => (
                    <td key={computer.id_computer}>{computer.sistema_operativo}</td>
                  ))}
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla de resultados y clasificación */}
      <div className='Resultados'>
        <h1>Resultados de comparación</h1>
          <table>
            <thead>
              <tr>
                <th>Computador</th>
                {selectedProducts.map((computer) => (
                  <th key={computer.id_computer}>
                    {computer.modelo}
                    <br />
                    <img src={computer.img} alt={computer.modelo} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                <tr>
                  <th>Costo</th>
                  {
                    selectedProducts.map((computer, index) => (
                      <td key={computer.id_computer}>
                        {clasificarProducto(
                          parametrosRanking.find((param) => param.nombre === 'costos').nombre,
                          parametrosRanking.find((param) => param.nombre === 'costos').lista[index],
                          parametrosRanking.find((param) => param.nombre === 'costos').umbralAlto,
                          parametrosRanking.find((param) => param.nombre === 'costos').umbralBajo,
                        )}
                      </td>
                    ))
                  } 
                </tr>
                <tr>
                  <th>Capacidad de Memoria</th>
                  {
                    selectedProducts.map((computer, index) => (
                      <td key={computer.id_computer}>
                        {clasificarProducto(
                          parametrosRanking.find((param) => param.nombre === 'cap_memoria').nombre,
                          parametrosRanking.find((param) => param.nombre === 'cap_memoria').lista[index],
                          parametrosRanking.find((param) => param.nombre === 'cap_memoria').umbralAlto,
                          parametrosRanking.find((param) => param.nombre === 'cap_memoria').umbralBajo,
                        )}
                      </td>
                    ))
                  }
                </tr>
                <tr>
                  <th>Capacidad de disco</th>
                  {
                    selectedProducts.map((computer, index) => (
                      <td key={computer.id_computer}>
                        {clasificarProducto(
                          parametrosRanking.find((param) => param.nombre === 'cap_disco').nombre,
                          parametrosRanking.find((param) => param.nombre === 'cap_disco').lista[index],
                          parametrosRanking.find((param) => param.nombre === 'cap_disco').umbralAlto,
                          parametrosRanking.find((param) => param.nombre === 'cap_disco').umbralBajo,
                        )
                        }
                      </td>
                    ))                    
                  }
                </tr>
                <tr>
                  <th>Capacidad de tarjeta gráfica</th>
                  {
                    selectedProducts.map((computer, index) => (
                      <td key={computer.id_computer}>
                        {clasificarProducto(
                          parametrosRanking.find((param) => param.nombre === 'cap_grafica').nombre,
                          parametrosRanking.find((param) => param.nombre === 'cap_grafica').lista[index],
                          parametrosRanking.find((param) => param.nombre === 'cap_grafica').umbralAlto,
                          parametrosRanking.find((param) => param.nombre === 'cap_grafica').umbralBajo,
                        )}
                      </td>
                    ))
                  }
                </tr>
                <tr>
                  <th>Velocidad de procesador</th>
                  {
                    selectedProducts.map((computer, index) => (
                      <td key={computer.id_computer}>
                        {clasificarProducto(
                          parametrosRanking.find((param) => param.nombre === 'vel_procesador'),
                          parametrosRanking.find((param) => param.nombre === 'vel_procesador').lista[index],
                          parametrosRanking.find((param) => param.nombre === 'vel_procesador').umbralAlto,
                          parametrosRanking.find((param) => param.nombre === 'vel_procesador').umbralBajo,
                        )}
                      </td>
                    ))
                  }
                </tr>
                <tr>
                  <th>Promedio de calidad</th>
                  {
                    selectedProducts.map((computer, index) => {
                      const simbolos = parametrosRanking.map((param) => clasificarProducto(param.nombre,param.lista[index], param.umbralAlto, param.umbralBajo));
                      const lengthParametros = parametrosRanking.length;
                      return (
                        <td key={computer.id_computer}>
                          {contarMejor(lengthParametros,simbolos)}
                        </td>
                      );
                    })
                  }
                </tr>
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default Comparador;