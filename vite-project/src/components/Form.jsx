import React, { useState } from 'react';
import './Form.css';

const Modal = ({ closeModal, handleContinue}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  };

  const handleModifierClick = () => {
      closeModal();
  };

  const handleContinueClick = () => {
    handleContinue();
};


  return (
      <div className="modal">
          <div className="modal-content">
              <p>Confirmation de notre ville, pour la récupération de votre véhicule :</p>
              <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Paris 08"
              />
              <div className="modal-buttons">
              <button className="modifier-button" onClick={handleModifierClick}>Modifier</button>
              <button className="continuer-button" onClick={handleContinueClick}>Continuer</button>
              </div>
          </div>
      </div>
  );
};


const Form = () => {
  const [model, setModel] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showAchatForm, setShowAchatForm] = useState(false);
  const [showLeasingForm, setShowLeasingForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    setShowConfirmation(false); 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmation(false); 
  };

  const handleShowForm = (modelName) => {
    setModel(modelName);
    setShowConfirmation(false); 
    setShowForm(true);
  };

  const achats = (modelName) => {
    setModel(modelName);
    setShowConfirmation(false); 
    setShowAchatForm(true);
    setShowLeasingForm(false); 
    setShowForm(false);
  };

  const leasing = (modelName) => {
    setModel(modelName);
    setShowAchatForm(false);
    setShowConfirmation(false); 
    setShowLeasingForm(true); 
    setShowForm(false);
  };

  const contact = (modelName) => {
    setModel(modelName);
    setShowAchatForm(false);
    setShowConfirmation(false); 
    setShowLeasingForm(false); 
    setShowForm(false);
    setShowContact(true);
  };

  const handleContinue = async () => {
    setShowAchatForm(false);
    setShowLeasingForm(false);
    setShowForm(false);
    setShowModal(false);
    setShowContact(false);
    setShowConfirmation(true);
    try {
      const ville = await fetchCityName(codePostal);

      const leadData = {
        type_modele: model,
        nom: nom,
        prenom: prenom,
        ville: ville,
        telephone: telephone
      };

      await sendLeadData(leadData);

      setShowModal(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchCityName = async (codePostal) => {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`);
      if (!response.ok) {
        throw new Error('La requête n\'a pu aboutir');
      }
      const data = await response.json();
      if (data.length > 0) {
        return data[0].nom;
      } else {
        throw new Error('Aucune ville n\'a été trouvée pour ce code postal');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du nom de la ville :', error);
      throw error;
    }
  };

  const sendLeadData = async (leadData) => {
    try {
      const response = await fetch('https://hooks.zapier.com/hooks/catch/6844401/3sjq5ou/?em=test@hipto.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: leadData }),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <div>
      {!showForm && !showAchatForm && !showLeasingForm && !showContact && !showConfirmation &&(
        <div className="form-group">
          <label>Quel est le type de modèle que vous souhaitez tester ?</label>
          <button type="button" onClick={() => handleShowForm('compact')}>COMPACTE</button>
          <button type="button" onClick={() => handleShowForm('suv')}>SUV</button>
          <button type="button" onClick={() => handleShowForm('electric-hybrid')}>ÉLECTRIQUE & HYBRIDE</button>
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
          <button type="button" onClick={() => contact('occasion')}>OCCASION</button>
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
        <div className="form-group">
          <div className="name-fields">
            <label className="Prenom">
              PRÉNOM
              <input name="prenomInput" defaultValue="Ecrire" className="styled-inputPrenom" />
            </label>
            <label className="Nom">
              NOM
              <input name="nomInput" defaultValue="Ecrire" className="styled-inputNom" />
            </label>
            <label className="Code">
              CODE POSTAL
              <input name="codeInput" defaultValue="1234" className="styled-inputcode" />
            </label>
            <label className="tel">
              TÉLÉPHONE
              <input name="telInput" defaultValue="0X XX XX XX XX" className="styled-inputtel" />
            </label>
          </div>
          <button className="continue" type="button" onClick={handleShowModal}>CONTINUER</button>
        </div>
      )}

      {showModal && (
        <Modal 
          closeModal={handleCloseModal} 
          handleContinue={handleContinue}
          handleModifierClick={handleCloseModal} 
          handleContinueClick={handleContinue} 
        />
      )}

      {showConfirmation && (
        <div className="confirmation-group">
          <div className="confirmation-text">
            <label>Votre réservation a bien été prise en compte.</label>
           </div>
          <div className="confirmation-text2">
            <label>Vous serez contacté dans <span className="underline">un délai de 48h.</span></label>
          </div>
          <div className="confirmation-thanks">
            <label>L'équipe Alfa Romeo vous remercie.</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;