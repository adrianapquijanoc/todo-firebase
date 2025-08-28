import React, { useEffect, useState } from "react";
import { db, collection, addDoc, getDocs } from "./firebase";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);

  // GET: Cargar tareas desde Firebase
  const cargarTareas = async () => {
    const querySnapshot = await getDocs(collection(db, "tareas"));
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });
    setTareas(docs);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // POST: Agregar tarea a Firebase
  const agregarTarea = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    await addDoc(collection(db, "tareas"), {
      titulo: texto,
      completada: false,
      fecha: new Date().toISOString()
    });

    setTexto("");
    cargarTareas(); // Recarga las tareas
  };

  return (
    <div className="app">
      <h1>TODO List con Firebase</h1>

      <form onSubmit={agregarTarea} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button>Agregar</button>
      </form>

      <div>
        {tareas.length === 0 ? (
          <p>No hay tareas todavía</p>
        ) : (
          <div style={{ display: "grid", gap: "10px" }}>
            {tareas.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  background: "#f9f9f9"
                }}
              >
                <strong>{t.titulo}</strong>
                <p>{t.completada ? "✅ Completada" : "⏳ Pendiente"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

