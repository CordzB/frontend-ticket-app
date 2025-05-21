import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(false);
  const API_URL = 'https://backend-ticket-r1nc.onrender.com/api/tickets';

  const obtenerTickets = async () => {
    setCargando(true);
    try {
      const res = await axios.get(API_URL);
      setTickets(res.data);
    } catch (err) {
      console.error('Error al obtener tickets:', err);
    } finally {
      setCargando(false);
    }
  };

  const marcarComoResuelto = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { estado: 'resuelto' });
      obtenerTickets();
    } catch (err) {
      console.error('Error al actualizar ticket:', err);
    }
  };

  useEffect(() => {
    obtenerTickets();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Tickets</h2>
      <button className="btn btn-outline-secondary mb-3" onClick={obtenerTickets}>🔄 Recargar</button>

      {cargando ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {tickets.map((ticket) => (
            <div className="col-md-6 mb-3" key={ticket.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ticket.titulo}</h5>
                  <p className="card-text">{ticket.descripcion}</p>
                  <span className="badge bg-info text-dark">{ticket.estado}</span>
                  <div className="mt-2">
                    {ticket.estado !== 'resuelto' ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => marcarComoResuelto(ticket.id)}
                      >
                        Marcar como resuelto
                      </button>
                    ) : (
                      <span className="text-success">✔️ Ticket resuelto</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerTickets;
