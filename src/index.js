import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App'; // Asegúrate de que esté apuntando al archivo correcto


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

