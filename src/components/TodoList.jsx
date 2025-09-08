export default function TodoList({ todos, completeTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.task}
          <button onClick={() => completeTodo(todo.id)}>Completar</button>
        </li>
      ))}
    </ul>
  );
}
