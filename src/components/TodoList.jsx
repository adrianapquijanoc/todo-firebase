export default function TodoList({ todos, completeTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          {todo.task}
          {!todo.completed && (
            <button onClick={() => completeTodo(todo.id)}>Completar</button>
          )}
        </li>
      ))}
    </ul>
  );
}

