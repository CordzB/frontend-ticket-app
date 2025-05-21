import React, { useState } from 'react';
import axios from 'axios';

const AgregarTicket = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarFormulario = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/tickets', {
        titulo,
        descripcion,
      });
      setMensaje('✅ Ticket guardado correctamente.');
      setTitulo('');
      setDescripcion('');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al guardar el ticket.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Agregar Nuevo Ticket</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label>Título:</label><br />
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div><br />
        <div>
          <label>Descripción:</label><br />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div><br />
        <button type="submit">Guardar Ticket</button>
      </form>
      {mensaje && <p style={{ marginTop: '1rem', color: mensaje.startsWith('✅') ? 'green' : 'red' }}>{mensaje}</p>}
    </div>
  );
};

export default AgregarTicket;
