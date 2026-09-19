import { component$, useSignal } from "@builder.io/qwik";
import { deleteTodo, updateTodo } from "~/lib/todos";

// each todo item
export const Todo = component$(({ todo }: { todo: TodoDoc }) => {
    const error = useSignal<string | null>(null);

    return (
        <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 items-center justify-items-start">
            <span class={todo.complete ? 'line-through text-green-700' : ''}>{todo.text}</span>
            <span class={todo.complete ? 'line-through text-green-700' : ''}>{todo.id}</span>
            <button type="button" onClick$={async () => {
                const result = await updateTodo(todo.id, !todo.complete);
                error.value = result.error;
            }}>{todo.complete ? '✔️' : '❌'}</button>
            <button type="button" onClick$={async () => {
                const result = await deleteTodo(todo.id);
                error.value = result.error;
            }}> 🗑 </button>
            {error.value && <p role="alert" class="col-span-4 text-red-600">{error.value}</p>}
        </div>
    );
});
