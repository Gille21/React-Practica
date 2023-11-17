import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Styles/styles.css';
import Header from './Header';
import Footer from './Footer';
import Formulario from './Formulario';
import Resultados from './Resultados';
import Body from './Body';
import About from './About';
import Shop from './Shop';
import Producto from './Producto';
import Home from './views/home';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';
import Private from './views/private';
import MainWrapper from './layouts/MainWrapper';
import PrivateRoute from './layouts/PrivateRoute';
import Ccompu from './crud/ccompu';
import Consulta from './consulta';


function App() {
  return (
    <Router>          
      <MainWrapper>
      <div className="root">
      <Header />
        <Routes>        
        <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} /> {/* Ruta para la página About */}
            <Route path="/shop" element={<Shop />} /> {/* Ruta para la página About */}
            <Route path="/formulario" element={<Formulario />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/producto/:id" element={<Producto />} />
          <Route path="/portalHome" element={<Home />} />
          <Route path="/views/login" element={<Login/>} />
          <Route path="/views/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />        
          <Route path="/private" element={
                <PrivateRoute>
                  <Private />
                </PrivateRoute>} />
          <Route path="/crud/ccompu" element={<Ccompu />} />
          <Route path="/consulta" element={<Consulta />} />
        </Routes>
        <Footer />
      </div>
      </MainWrapper>
    </Router>
  );
}


export default App;
