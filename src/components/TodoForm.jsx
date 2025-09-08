import { useState } from 'react'

export default function TodoForm({ addTodo }) {
  const [task, setTask] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (task.trim()) {
      addTodo(task)
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: '8px', width: '250px' }}
      />
      <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>Agregar</button>
    </form>
  )
}
