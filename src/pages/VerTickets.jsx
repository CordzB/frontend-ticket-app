import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(false);

  const API_URL = 'http://192.168.0.110:3001/api/tickets'; // ← usa tu IP si es necesario

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
      obtenerTickets(); // recargar automáticamente
    } catch (err) {
      console.error('Error al actualizar ticket:', err);
    }
  };

  useEffect(() => {
    obtenerTickets();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Tickets</h2>
      <button onClick={obtenerTickets} style={{ marginBottom: '1rem' }}>
        🔄 Recargar
      </button>
      {cargando && <p>Cargando tickets...</p>}
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.titulo}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.estado}</td>
              <td>
                {ticket.estado !== 'resuelto' ? (
                  <button onClick={() => marcarComoResuelto(ticket.id)}>
                    Marcar como resuelto
                  </button>
                ) : (
                  '✔️'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerTickets;
