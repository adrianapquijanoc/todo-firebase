export default function TodoList({ todos, toggleComplete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.task}
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "Desmarcar" : "Completar"}
          </button>
        </li>
      ))}
    </ul>
  );
}
