import { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './index.css'
import { db } from './firebaseConfig' // Importa db desde tu configuración

function App() {
  const [todos, setTodos] = useState([])

  // Leer tareas en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'todos'), snapshot => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setTodos(list)
    })
    return () => unsub()
  }, [])

  // Agregar tarea
  const addTodo = async (task) => {
    if (!task) return
    await addDoc(collection(db, 'todos'), { task, completed: false })
  }

  // Marcar/desmarcar tarea
  const toggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return
    const docRef = doc(db, 'todos', id)
    await updateDoc(docRef, { completed: !todo.completed })
  }

  return (
    <div className="app-container">
      <h1>Todo List con Firebase</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </div>
  )
}

export default App
