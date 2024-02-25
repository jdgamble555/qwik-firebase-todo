import { Fragment } from "@builder.io/qwik/jsx-runtime";
import type { TodoItem } from "~/lib/todos";
import { deleteTodo, updateTodo } from "~/lib/todos";

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    return (
        <Fragment key={todo.id}>
            <span class={todo.complete ? 'line-through text-green-700' : ''}>{todo.text}</span>
            <span class={todo.complete ? 'line-through text-green-700' : ''}>{todo.id}</span>
            {todo.complete
                ? <button type="button" onClick$={() => updateTodo(todo.id, !todo.complete)}> ✔️ </button>
                : <button type="button" onClick$={() => updateTodo(todo.id, !todo.complete)}> ❌ </button>}
            <button type="button" onClick$={() => deleteTodo(todo.id)}> 🗑 </button>
        </Fragment>
    );
};