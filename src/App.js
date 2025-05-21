import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AgregarTicket from './pages/AgregarTicket';
import VerTickets from './pages/VerTickets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AgregarTicket />} />
        <Route path="/ver" element={<VerTickets />} />
      </Routes>
    </Router>
  );
}

export default App;
