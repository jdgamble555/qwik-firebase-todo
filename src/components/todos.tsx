import { $, component$, useSignal } from "@builder.io/qwik";
import { useTodos, addTodo, generateText } from "~/lib/todos";
import { Todo } from "./todo-item";

// todo component
export default component$(() => {

    const todos = useTodos();

    return (
        <div>
            <div class="flex flex-col gap-3">
                {todos.value.loading ? <p>Loading todos...</p> : todos.value.error ? <p role="alert" class="text-red-600">{todos.value.error}</p> : todos.value.data.length
                    ? todos.value.data.map((todo) => <Todo key={todo.id} todo={todo} />)
                    : <p><b>Add your first todo item!</b></p>
                }
            </div>
            <TodoForm />
        </div>
    );
});

// todo form
export const TodoForm = component$(() => {
    const text = useSignal(generateText());
    const error = useSignal<string | null>(null);

    const onSubmit = $(async () => {
        error.value = null;

        const submittedText = text.value;

        const result = await addTodo(submittedText);
        error.value = result.error;

        if (!result.error) {
            text.value = generateText();
        }
    });

    return (
        <div class="mt-5">
            <form class="flex gap-3 items-center justify-center" preventdefault:submit onSubmit$={onSubmit}>
                <input
                    class="border p-2 rounded-lg"
                    bind:value={text}
                />
                <button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit">
                    Add Task
                </button>
            </form>
            {error.value && <p role="alert" class="mt-2 text-center text-red-600">{error.value}</p>}
        </div>
    );
});
