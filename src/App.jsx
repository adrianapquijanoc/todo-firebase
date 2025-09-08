import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  // 📌 Estado de las tareas
  const [todos, setTodos] = useState([]);

  // 📌 Leer tareas en tiempo real desde Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodos(list);
    }, (error) => {
      console.error("Error leyendo Firestore:", error);
    });

    return () => unsub(); // limpieza al desmontar
  }, []);

  // 📌 Agregar una nueva tarea
  const addTodo = async (task) => {
    if (!task.trim()) return;
    try {
      await addDoc(collection(db, "todos"), { task, completed: false });
    } catch (error) {
      console.error("Error agregando tarea:", error);
    }
  };

  // 📌 Marcar o desmarcar tarea completada
  const toggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const docRef = doc(db, "todos", id);
    try {
      await updateDoc(docRef, { completed: !todo.completed });
    } catch (error) {
      console.error("Error actualizando tarea:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo List con Firebase</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
