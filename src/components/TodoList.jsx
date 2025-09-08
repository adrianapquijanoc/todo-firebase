export default function TodoList({ todos, toggleComplete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={todo.completed ? "completed" : ""}
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
