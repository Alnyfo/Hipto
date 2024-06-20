import React from 'react';
import './App.css';
import Form from './components/Form.jsx';
import logo from './image/logo.png'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </header>
      <main>
        <div className="hero-section">
          <div className="hero-text">
            <div className="hero-title">
              <h1>DE NOUVELLES ÉMOTIONS COMMENCENT ICI</h1>
            </div>
            <div className="hero-subtitle">
              <p>Réservez un essai gratuitement en remplissant le formulaire et faites
              connaissance avec l’univers Alfa Romeo.</p>
            </div>
          </div>
          <div className="form-container">
            <Form /> 
          </div>
        </div>
      </main>
      <footer>
        <div class="footer-links">
          <a href="#">POLITIQUE DE CONFIDENTIALITÉ</a><br></br>
          <a href="#">CONDITIONS GÉNÉRALES D'UTILISATION</a><br></br>
          <a href="#">RÉGLEMENTATION - LOI AGEC</a><br></br>
          <a href="#">COOKIE</a><br></br>
          <a href="#">DROITS D'AUTEUR</a><br></br>
        </div>
      </footer>
    </div>
  );
}

export default App;
