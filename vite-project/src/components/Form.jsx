import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [model, setModel] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAchatForm, setShowAchatForm] = useState(false);
  const [showLeasingForm, setShowLeasingForm] = useState(false);
  const [showContact, setShowContact] = useState(false);

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

  const contact = (modelName) => {
    setModel(modelName);
    setShowAchatForm(false);
    setShowLeasingForm(false); 
    setShowForm(false);
    setShowContact(true);
  };

  return (
    <div>
      {!showForm && !showAchatForm && !showLeasingForm && !showContact && (
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
            <button type="button" onClick={() => contact('neuf')}>NEUF</button>
            <button type="button" onClick={() => achats('occasion')}>OCCASION</button>
          </div>
      )}

      {showLeasingForm && (
          <div className="form-group">
            <label>Pour quelle durée ?</label>
            <button type="button" onClick={() => contact('6')}>6 MOIS</button>
            <button type="button" onClick={() => contact('12')}>12 MOIS</button>
            <button type="button" onClick={() => contact('18')}>18 MOIS</button>
            <button type="button" onClick={() => contact('24')}>24 MOIS</button>
          </div>
      )}

      {showContact && (
              <div class="form-group">
                <div class="name-fields">
                <label class="Prenom">
                    PRENOM
                    <input name="prenomInput" defaultValue="Ecrire" class="styled-inputPrenom" />
                  </label>
                  <label class="Nom">
                    NOM
                    <input name="nomInput" defaultValue="Ecrire" class="styled-inputNom" />
                  </label>
                  <label class="Code">
                    CODE POSTAL
                    <input name="codeInput" defaultValue="1234" class="styled-inputcode" />
                  </label>
                  <label class="tel">
                    TELEPHONE
                    <input name="telInput" defaultValue="0X XX XX XX XX" class="styled-inputtel" />
                  </label>
                </div>
                <button class="continue" type="button" onClick={() => contact('continuer')}>CONTINUER</button>
            </div>            
          )}


    </div>
  );
};

export default Form;
