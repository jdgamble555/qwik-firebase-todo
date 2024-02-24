import { component$ } from "@builder.io/qwik";
import { type TodoItem, useTodos, updateTodo, deleteTodo, addTodo } from "~/lib/todos";
import type { userData } from "~/lib/user";

// todo component
export default component$((user: userData) => {

    const { todos } = useTodos(user);

    return (
        <div>
            <ul>
                {todos.length
                    ? todos.map((todo) => <Todo key={todo.id} {...{ todo }} />)
                    : <p><b>Add your first todo item!</b></p>
                }
            </ul>
            <TodoForm />
        </div>
    );
});

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    return (
        <li>
            <span class={todo.complete ? 'line-through text-green-700' : 'mr-3'}>{todo.text} - {todo.id}</span>
            {todo.complete
                ? <button class="mr-3" onClick$={() => updateTodo(todo.id, !todo.complete)}> ✔️ </button>
                : <button class="mr-3" onClick$={() => updateTodo(todo.id, !todo.complete)}> ❌ </button>}
            <button onClick$={() => deleteTodo(todo.id)}> 🗑 </button>
        </li>
    );
};

// todo add event
export const addTodoSubmit = (e: SubmitEvent) => {

    // get and reset form
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form);

    if (typeof task !== 'string') {
        return;
    }

    // reset form
    target.reset();

    // add todo
    addTodo(task);
};

// todo form
export const TodoForm = () => {
    return (
        <form class="flex gap-3 items-center justify-center mt-5" preventdefault:submit onSubmit$={(e) => addTodoSubmit(e)}>
            <input class="border p-2" name="task" />
            <button class="border p-2 rounded-md text-white bg-sky-700" type="submit">Add Task</button>
        </form>
    );
};