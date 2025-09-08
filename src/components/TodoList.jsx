export default function TodoList({ todos, toggleComplete }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map(todo => (
        <li
          key={todo.id}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          {todo.task}
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? 'Desmarcar' : 'Completar'}
          </button>
        </li>
      ))}
    </ul>
  )
}

