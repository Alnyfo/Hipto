import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [model, setModel] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAchatForm, setShowAchatForm] = useState(false);
  const [showLeasingForm, setShowLeasingForm] = useState(false);

  const handleShowForm = (modelName) => {
    setModel(modelName);
    setShowForm(true);
  };

  const achats = (modelName) => {
    setModel(modelName);
    setShowAchatForm(true);
    setShowLeasingForm(false); 
    setShowForm(false);
  };

  const leasing = (modelName) => {
    setModel(modelName);
    setShowAchatForm(false);
    setShowLeasingForm(true); 
    setShowForm(false);
  };

  return (
    <div>
      {!showForm && !showAchatForm && !showLeasingForm && (
        <div className="form-group">
          <label>Quel est le type de modèle que vous souhaitez tester ?</label>
          <button type="button" onClick={() => handleShowForm('compact')}>COMPACTE</button>
          <button type="button" onClick={() => handleShowForm('suv')}>SUV</button>
          <button type="button" onClick={() => handleShowForm('electric-hybrid')}>ELECTIQUE & HYBRIDE</button>
          <button type="button" onClick={() => handleShowForm('sport')}>SPORTIVE</button>
        </div>
      )}

      {showForm && (
          <div className="form-group">
            <label>Vous êtes intéressé par :</label>
            <button type="button" onClick={() => achats('achat')}>UN ACHAT</button>
            <button type="button" onClick={() => leasing('leasing')}>UN LEASING</button>
          </div>
      )}

      {showAchatForm && (
          <div className="form-group">
            <label>Pour quel type de véhicule ?</label>
            <button type="button" onClick={() => achats('neuf')}>NEUF</button>
            <button type="button" onClick={() => achats('occasion')}>OCCASION</button>
          </div>
      )}

      {showLeasingForm && (
          <div className="form-group">
            <label>Pour quelle durée ?</label>
            <button type="button" onClick={() => leasing('6')}>6 MOIS</button>
            <button type="button" onClick={() => leasing('12')}>12 MOIS</button>
            <button type="button" onClick={() => leasing('18')}>18 MOIS</button>
            <button type="button" onClick={() => leasing('24')}>24 MOIS</button>
          </div>
      )}
    </div>
  );
};

export default Form;
