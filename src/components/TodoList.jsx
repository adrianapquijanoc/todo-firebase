import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function TodoList({ todos, completeTodo }) {
  return (
    <TransitionGroup component="ul" className="todo-list">
      {todos.map((todo) => (
        <CSSTransition key={todo.id} timeout={300} classNames="fade">
          <li className="todo-item">
            {todo.task}
            <button onClick={() => completeTodo(todo.id)}>Completar</button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
