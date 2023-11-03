import React from 'react';
import './Styles/Comaprador.css';

function Comparador(props) {
  const { selectedProducts } = props;

  return (
    <div className="comparador">
      <h1>Comparador de Computadoras</h1>
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
            {selectedProducts.length > 0 && (
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
    </div>
  );
}

export default Comparador;
