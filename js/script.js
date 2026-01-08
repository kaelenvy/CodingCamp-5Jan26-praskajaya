//temporary Storage for todo items
let todos = [];

//function to add todo
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value === '' || todoDate.value === '') {
        alert('Please fill in both the todo and date fields.');
        return;
    } else {
        const newTodo = {
            task: todoInput.value,
            date: todoDate.value
        };

        // Add new todo to the array
        todos.push(newTodo);

        renderTodos();

        //clear input fields
        todoInput.value = '';
        todoDate.value = '';
    }
}

//function to render todo items to the DOM
function renderTodos() {
    const todoList = document.getElementById('todo-list');

    // Clear existing todos
    todoList.innerHTML = '';

    // Render each todo item
    todos.forEach((todo, _) => {
        todoList.innerHTML += `
        <li>
            <p class="text-2xl">${todo.task} <span class="text-sm text-gray-500">(${todo.date})</span></p>
            <hr />
        </li>`;
    });
}

//function to remove todo
function removeAllTodo() {
    todos = [];
    renderTodos();
}

//function filtertodo
function filterTodo() {}