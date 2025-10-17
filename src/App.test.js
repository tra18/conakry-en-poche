import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Version de test simplifiée
function TestApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#dc2626' }}>🇬🇳 Conakry en Poche - Test</h1>
      <p>Si vous voyez ce message, React fonctionne correctement !</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3>Fonctionnalités disponibles :</h3>
        <ul>
          <li>✅ Carrousel professionnel</li>
          <li>✅ Page de contact</li>
          <li>✅ Bannières publicitaires</li>
          <li>✅ Administration</li>
          <li>✅ Assistant IA</li>
        </ul>
      </div>
    </div>
  );
}

// Rendu direct pour test
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TestApp />);
