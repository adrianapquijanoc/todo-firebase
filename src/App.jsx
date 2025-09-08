import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);

  // Leer tareas en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(list);
    }, (error) => console.error("Error leyendo Firestore:", error));

    return () => unsub();
  }, []);

  // Agregar tarea
  const addTodo = async (task) => {
    if (!task.trim()) return;
    try {
      await addDoc(collection(db, "todos"), { task, completed: false });
    } catch (error) {
      console.error("Error agregando tarea:", error);
    }
  };

  // Completar tarea y eliminar de Firestore
  const completeTodo = async (id) => {
    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error eliminando tarea:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List con Firebase</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} completeTodo={completeTodo} />
    </div>
  );
}

export default App;
