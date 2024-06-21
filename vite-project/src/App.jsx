import React from 'react';
import './App.css'; // Import CSS styles for the application
import Form from './components/Form.jsx'; // Import Form component
import logo from './image/logo.png'; // Import logo image for the application

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <img src={logo} className="App-logo" alt="logo" /> {/* Display the logo */}
        </div>
      </header>
      <main>
        <div className="hero-section">
          <div className="hero-text">
            <div className="hero-title">
              <h1>DE NOUVELLES ÉMOTIONS COMMENCENT ICI</h1> {/* Title text */}
            </div>
            <div className="hero-subtitle">
              <p>Réservez un essai gratuitement en remplissant le formulaire et faites
              connaissance avec l’univers Alfa Romeo.</p> {/* Subtitle text */}
            </div>
          </div>
          <div className="form-container"> {/* Form container */}
            <Form /> {/* Render the Form component */}
          </div>
        </div>
      </main>
      <footer> 
        <div className="footer-links">
          {/* Footer links */}
          <a href="#">PRIVACY POLICY</a>
          <a href="#">TERMS OF USE</a>
          <a href="#">REGULATION - AGEC LAW</a>
          <a href="#">COOKIE</a>
          <a href="#">COPYRIGHT</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
