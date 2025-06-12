import "./TodoList.scss";
import TodoItem from "../TodoItem/TodoItem";


export default function TodoList({ todos, setTodos }) {

    return(
        <section className="to-do-list">
                {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    setTodos={setTodos}
                />
                ))}
        </section>
    )
}