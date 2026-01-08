// Temporary storage
let todos = [];
let currentFilter = 'all';

// Add todo
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (!todoInput.value || !todoDate.value) {
        alert('isi semua field dulu ya!');
        return;
    }

    todos.push({
        task: todoInput.value,
        date: todoDate.value,
        completed: false,
        editing: false
    });

    todoInput.value = '';
    todoDate.value = '';

    renderTodos();
}

// Render todos
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];

    let filtered = todos;
    if (currentFilter === 'today') {
        filtered = todos.filter(t => t.date === today);
    } else if (currentFilter === 'upcoming') {
        filtered = todos.filter(t => t.date > today);
    }

    if (filtered.length === 0) {
        todoList.innerHTML = `<li class="text-gray-500 text-sm">No Todos available</li>`;
        return;
    }

    filtered.forEach((todo, index) => {
        todoList.innerHTML += `
        <li class="
            bg-gray-800/70 border border-gray-700 rounded-xl p-4
            flex items-start gap-3
            transition-all duration-300
            ${todo.completed ? 'shadow-[0_0_15px_rgba(34,197,94,0.6)]' : ''}
            animate-fade-in
        ">
            <!-- Checkbox -->
            <input
                type="checkbox"
                ${todo.completed ? 'checked' : ''}
                onclick="toggleComplete(${index})"
                class="mt-1 w-5 h-5 accent-green-400 cursor-pointer"
            >

            <!-- Content -->
            <div class="flex-1 min-w-0">
                ${
                    todo.editing
                    ? `
                        <input
                            type="text"
                            value="${todo.task}"
                            onblur="saveEdit(${index}, this.value)"
                            onkeydown="if(event.key==='Enter') saveEdit(${index}, this.value)"
                            class="w-full bg-black/30 text-green-400 border border-green-400
                            rounded-md px-2 py-1 focus:outline-none"
                            autofocus
                        >
                      `
                    : `
                        <p
                            ondblclick="enableEdit(${index})"
                            class="font-medium break-all cursor-text
                            ${todo.completed ? 'line-through text-gray-400' : 'text-gray-100'}"
                        >
                            ${todo.task}
                        </p>
                      `
                }
                <p class="text-sm text-gray-400 mt-1">${todo.date}</p>
            </div>
        </li>
        `;
    });
}

// Toggle completedd
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

// Enable edit
function enableEdit(index) {
    todos[index].editing = true;
    renderTodos();
}

// Save edit
function saveEdit(index, value) {
    todos[index].task = value.trim() || todos[index].task;
    todos[index].editing = false;
    renderTodos();
}

// Remove all
function removeAllTodo() {
    todos = [];
    renderTodos();
}

// Filter
function filterTodo(value) {
    currentFilter = value;
    renderTodos();
}
