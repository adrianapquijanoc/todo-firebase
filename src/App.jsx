import { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);

  // Suscripción en tiempo real a Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "todos"),
      (snapshot) => {
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(list);
      },
      (error) => console.error("Error leyendo Firestore:", error)
    );

    return () => unsub();
  }, []);

  const addTodo = async (task) => {
    if (!task.trim()) return;
    await addDoc(collection(db, "todos"), { task, completed: false });
  };

  const completeTodo = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, { completed: true });
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} completeTodo={completeTodo} />
    </div>
  );
}

export default App;
