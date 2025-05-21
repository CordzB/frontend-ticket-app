import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const AgregarTicket = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const enviarFormulario = async (e) => {
    e.preventDefault();

    if (!titulo || !descripcion) {
      Swal.fire("Todos los campos son obligatorios.", "", "warning");
      return;
    }

    try {
      await axios.post("https://backend-ticket-r1nc.onrender.com/api/tickets", {
        titulo,
        descripcion,
      });

      Swal.fire(
        "Ticket guardado",
        "El ticket fue registrado correctamente.",
        "success"
      );
      setTitulo("");
      setDescripcion("");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar el ticket.", "error");
    }
  };

  return (
    <div className="container mt-4">
      <h2>
        Agregar un Ticket{" "}
        <span style={{ fontSize: "2rem", color: "black" }}>♾️</span>
      </h2>
      <form onSubmit={enviarFormulario}>
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            rows="4"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Ticket
        </button>

        <div className="mt-3">
          <a href="/ver" className="btn btn-outline-dark">
            Ver Tickets
          </a>
        </div>
      </form>
    </div>
  );
};

export default AgregarTicket;
