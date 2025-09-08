import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function App() {
  const [texto, setTexto] = useState("");
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const refTareas = collection(db, "tareas");

  // GET: traer tareas (ordenadas por fecha desc)
  const cargarTareas = async () => {
    setCargando(true);
    const q = query(refTareas, orderBy("creadaEn", "desc"));
    const snap = await getDocs(q);
    const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTareas(lista);
    setCargando(false);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  // POST: crear tarea
  const agregarTarea = async (e) => {
    e.preventDefault();
    const titulo = texto.trim();
    if (!titulo) return;
    await addDoc(refTareas, {
      titulo,
      completada: false,
      creadaEn: serverTimestamp(),
    });
    setTexto("");
    await cargarTareas();
  };

  // UPDATE: marcar completada/pendiente
  const toggleCompletada = async (t) => {
    const ref = doc(db, "tareas", t.id);
    await updateDoc(ref, { completada: !t.completada });
    await cargarTareas();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>TODO List (Firebase)</h1>
        <p className="sub">POST (crear) + GET (listar) + marcar completadas</p>
      </header>

      <form className="form" onSubmit={agregarTarea}>
        <input
          className="input"
          type="text"
          placeholder="Escribe una tarea…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn">Agregar</button>
      </form>

      {cargando ? (
        <p className="muted">Cargando…</p>
      ) : tareas.length === 0 ? (
        <p className="muted">Sin tareas por ahora ✨</p>
      ) : (
        <div className="grid">
          {tareas.map((t) => (
            <article key={t.id} className="card">
              <div className="card-row">
                <label className="checkline">
                  <input
                    type="checkbox"
                    checked={t.completada}
                    onChange={() => toggleCompletada(t)}
                  />
                  <span className={t.completada ? "texto done" : "texto"}>
                    {t.titulo}
                  </span>
                </label>
              </div>
              <div className="badge">
                {t.completada ? "✅ Completada" : "⏳ Pendiente"}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}