import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveHeader from './components/ResponsiveHeader';
import ResponsiveFooter from './components/ResponsiveFooter';
import AIAssistant from './components/AIAssistant';
import ResponsiveHomePage from './pages/ResponsiveHomePage';
import AdminPanel from './pages/AdminPanel';
import BusinessRegistrationPage from './pages/BusinessRegistrationPage';
import CategoryPage from './pages/CategoryPage';
import TrafficPage from './pages/TrafficPage';
import TrafficMapPage from './pages/TrafficMapPage';
import VivreEnGuineePage from './pages/VivreEnGuineePage';
import { NotificationProvider } from './contexts/NotificationContext';
import { BusinessProvider } from './contexts/BusinessContext';

function App() {
  return (
    <NotificationProvider>
      <BusinessProvider>
        <Router>
          <div className="App">
                    <ResponsiveHeader />
            <main>
              <Routes>
                <Route path="/" element={<ResponsiveHomePage />} />
                <Route path="/category/:categorySlug" element={<CategoryPage />} />
                <Route path="/traffic" element={<TrafficPage />} />
                <Route path="/traffic-map" element={<TrafficMapPage />} />
                <Route path="/vivre-en-guinee" element={<VivreEnGuineePage />} />
                <Route path="/news" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Actualités</h1><p>Page en construction</p></div>} />
                <Route path="/allo" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>ALLO Taxi</h1><p>Page en construction</p></div>} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/register-business" element={<BusinessRegistrationPage />} />
                <Route path="/contact" element={<div style={{padding: '2rem', textAlign: 'center'}}><h1>Contact</h1><p>Page en construction</p></div>} />
              </Routes>
            </main>
                    <ResponsiveFooter />
            <AIAssistant />
          </div>
        </Router>
      </BusinessProvider>
    </NotificationProvider>
  );
}

export default App;