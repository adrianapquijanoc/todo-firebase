export default function TodoList({ todos, toggleComplete }) {
  console.log("Renderizando todos:", todos); // <- depuración
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.task}
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "Desmarcar" : "Completar"}
          </button>
        </li>
      ))}
    </ul>
  );
}

