import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgregarTicket from './pages/AgregarTicket';
import VerTickets from './pages/VerTickets'; // 👈 importa esto

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgregarTicket />} />
        <Route path="/" element={<VerTickets />} />
        <Route path="/ver" element={<VerTickets />} /> {/* 👈 nueva ruta */}
      </Routes>
    </Router>
  );
}

export default App;
