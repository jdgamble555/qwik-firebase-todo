import type { QwikSubmitEvent} from "@builder.io/qwik";
import { component$, useStyles$ } from "@builder.io/qwik";
import { type TodoItem, useTodos, updateTodo, deleteTodo, addTodo } from "~/lib/todos";
import type { userData } from "~/lib/user";
import todoStyles from './todos.css?inline';

// todo component
export default component$((user: userData) => {
    useStyles$(todoStyles);
    const { todos } = useTodos(user);
    return (
        <>
            {todos.length
                ? todos.map((todo) => <Todo key={todo.id} {...{ todo }} />)
                : <p><b>Add your first todo item!</b></p>
            }
            <TodoForm uid={user.uid} />
        </>
    );
});

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    return (
        <li>
            <span class={todo.complete ? 'complete right' : 'right'}>{todo.text} - {todo.id}</span>
            {todo.complete
                ? <button class="right" onClick$={() => updateTodo(todo.id, !todo.complete)}> ✔️ </button>
                : <button class="right" onClick$={() => updateTodo(todo.id, !todo.complete)}> ❌ </button>}
            <button onClick$={() => deleteTodo(todo.id)}> 🗑 </button>
        </li>
    );
};

// todo add event
export const addTodoSubmit = (e: QwikSubmitEvent<HTMLFormElement> | FormData, uid: string) => {

    // get and reset form
    const target = (e as any).target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form) as Record<string, string>;

    // reset form
    target.reset();

    // add todo
    addTodo(uid, task);
};

// todo form
export const TodoForm = ({ uid }: { uid: string }) => {
    return (
        <>
            <br />
            <form preventdefault:submit onSubmit$={(e) => addTodoSubmit(e, uid)}>
                <input name="task" />
                <button type="submit">Add Task</button>
            </form>
        </>
    );
};