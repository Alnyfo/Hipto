import React, { useState } from 'react';
import './Form.css';

// Modal Component (Pop-up)
const Modal = ({ closeModal, handleContinue, inputValue, setInputValue }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p class="conf">Confirmation de votre ville, pour la récupération de votre véhicule :</p>
        {/* City input field */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paris 08"
        />
        {/* Modifier and Continue buttons */}
        <div className="modal-buttons">
          <button className="modifier-button" onClick={closeModal}>MODIFIER</button>
          <button className="continuer-button" onClick={handleContinue}>CONTINUER</button>
        </div>
      </div>
    </div>
  );
};

// Main Form Component
const Form = () => {
  // States to manage form state
  const [model, setModel] = useState(''); // Selected vehicle model
  const [showForm, setShowForm] = useState(false); // Display model selection
  const [showAchatForm, setShowAchatForm] = useState(false); // Display purchase/leasing choice
  const [showLeasingForm, setShowLeasingForm] = useState(false); // Display leasing duration choice
  const [showContact, setShowContact] = useState(false); // Display contact form
  const [showModal, setShowModal] = useState(false); // Display confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false); // Display confirmation message

  // States for form data
  const [prenom, setPrenom] = useState(''); // First name
  const [nom, setNom] = useState(''); // Last name
  const [codePostal, setCodePostal] = useState(''); // Postal code
  const [telephone, setTelephone] = useState(''); // Telephone
  const [ville, setVille] = useState(''); // City (for vehicle pickup)
  const [achatLeasing, setAchatLeasing] = useState(''); // Transaction type (purchase/leasing)
  const [neufOccasion, setNeufOccasion] = useState(''); // Vehicle type (new/used)
  const [dureeLeasing, setDureeLeasing] = useState(''); // Leasing duration

  // Function to show confirmation modal
  const handleShowModal = () => {
    setShowModal(true);
    setShowConfirmation(false);
  };

  // Function to close confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
    setShowConfirmation(false);
  };

  // Function to show vehicle model selection form
  const handleShowForm = (modelName) => {
    setModel(modelName);
    setShowConfirmation(false);
    setShowForm(true);
  };

  // Function for purchase selection
  const achats = (modelName) => {
    setAchatLeasing('achat');
    setModel(modelName);
    setShowConfirmation(false);
    setShowAchatForm(true);
    setShowLeasingForm(false);
    setShowForm(false);
  };

  // Function for leasing selection
  const leasing = (modelName) => {
    setAchatLeasing('leasing');
    setModel(modelName);
    setShowAchatForm(false);
    setShowConfirmation(false);
    setShowLeasingForm(true);
    setShowForm(false);
  };

  // Function for new/used vehicle selection
  const contact = (modelName) => {
    setNeufOccasion(modelName);
    setModel(modelName);
    setShowAchatForm(false);
    setShowConfirmation(false);
    setShowLeasingForm(false);
    setShowForm(false);
    setShowContact(true);
  };

  // Function to continue after filling out contact form
  const handleContinue = async () => {
    setShowAchatForm(false);
    setShowLeasingForm(false);
    setShowForm(false);
    setShowModal(false);
    setShowContact(false);
    setShowConfirmation(true);
    try {
      // Fetch city name based on entered postal code
      const ville = await fetchCityName(codePostal);

      // Prepare data to send
      const leadData = {
        type_modele: model,
        nom: nom,
        prenom: prenom,
        ville: ville,
        telephone: formatPhoneNumber(telephone),
        achat_leasing: achatLeasing,
        neuf_occasion: neufOccasion,
        duree_leasing: formatDuration(dureeLeasing),
      };

      // Send lead data
      await sendLeadData(leadData);

      setShowModal(false);
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to format leasing duration
  function formatDuration(duration) {
    return duration.replace(' mois', 'M');
  }

  // Function to format phone number
  const formatPhoneNumber = (phone) => {
    let formattedPhone = phone.replace(/^0/, '+33 ');
    formattedPhone = formattedPhone.replace(/ /g, '');
    return formattedPhone.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
  };

  // Function to fetch city name based on postal code
  const fetchCityName = async (codePostal) => {
    try {
      const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${codePostal}`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      if (data.length > 0) {
        return data[0].nom;
      } else {
        throw new Error('Invalid postal code');
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
      throw error;
    }
  };

  // Function to send lead data
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
      console.error('Error sending lead data:', error);
      throw error;
    }
  };

  return (
    <div>
      {/* Step 1: Vehicle model selection */}
      {!showForm && !showAchatForm && !showLeasingForm && !showContact && !showConfirmation && (
        <div className="form-group">
          <label class="bold-text">Quel est le type de modèle que vous souhaitez tester ?</label>
          <button type="button" onClick={() => handleShowForm('compact')}>COMPACTE</button>
          <button type="button" onClick={() => handleShowForm('suv')}>SUV</button>
          <button type="button" onClick={() => handleShowForm('electric-hybrid')}>ELECTRIQUE & HYBRIDE</button>
          <button type="button" onClick={() => handleShowForm('sport')}>SPORTIVE</button>
        </div>
      )}

      {/* Step 2: Purchase or leasing selection */}
      {showForm && (
        <div className="form-group">
          <label class="bold-text">Vous êtes intéressé par ?</label>
          <button type="button" onClick={() => achats('achat')}>UN ACHAT</button>
          <button type="button" onClick={() => leasing('leasing')}>UN LEASING</button>
        </div>
      )}

      {/* Step 3: New or used vehicle selection */}
      {showAchatForm && (
        <div className="form-group">
          <label class="bold-text">Pour quel type de véhicule ?</label>
          <button type="button" onClick={() => contact('neuf')}>NEUF</button>
          <button type="button" onClick={() => contact('occasion')}>OCCASION</button>
        </div>
      )}

      {/* Step 4: Leasing duration selection */}
      {showLeasingForm && (
        <div className="form-group">
          <label class="bold-text">Pour quelle durée ?</label>
          <button type="button" onClick={() => { contact('6 mois'); setDureeLeasing('6 mois'); }}>6 MOIS</button>
          <button type="button" onClick={() => { contact('12 mois'); setDureeLeasing('12 mois'); }}>12 MOIS</button>
          <button type="button" onClick={() => { contact('18 mois'); setDureeLeasing('18 mois'); }}>18 MOIS</button>
          <button type="button" onClick={() => { contact('24 mois'); setDureeLeasing('24 mois'); }}>24 MOIS</button>
        </div>
      )}

      {/* Step 5: Contact form */}
      {showContact && (
        <div className="form-group">
          <label class="coor2">Vos coordonnées :</label>
          <div className="name-fields">
            <label className="Prenom">
              PRENOM
              <input name="prenomInput" defaultValue="Ecrire" className="styled-inputPrenom" onChange={(e) => setPrenom(e.target.value)} />
            </label>
            <label className="Nom">
              NOM
              <input name="nomInput" defaultValue="Ecrire" className="styled-inputNom" onChange={(e) => setNom(e.target.value)} />
            </label>
            <label className="Code">
              CODE POSTAL
              <input name="codeInput" defaultValue="75008" className="styled-inputcode" onChange={(e) => setCodePostal(e.target.value)} />
            </label>
            <label className="tel">
              TELEPHONE
              <input name="telInput" defaultValue="06 XX XX XX XX" className="styled-inputtel" onChange={(e) => setTelephone(e.target.value)} />
            </label>
          </div>
          <button className="continue" type="button" onClick={handleShowModal}>CONTINUER</button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          closeModal={handleCloseModal}
          handleContinue={handleContinue}
          inputValue={ville}
          setInputValue={setVille}
        />
      )}

      {/* Final Step: Form submission confirmation */}
      {showConfirmation && (
        <div className="confirmation-group">
          <div className="confirmation-text">
            <label>Votre réservation a bien été prise en compte.</label>
          </div>
          <div className="confirmation-text2">
            <label>Vous serez contacté dans <span className="underline">un délai de 48H.</span></label>
          </div>
          <div className="confirmation-thanks">
            <label>L'équipe Alfa Romeo, vous remercie.</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
