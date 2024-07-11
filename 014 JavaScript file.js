document.addEventListener('DOMContentLoaded', () => {
    const todoListElement = document.getElementById('todo-list');
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');

    // Sample data
    const todos = [
        { id: 1, text: 'Learn JavaScript', completed: false },
        { id: 2, text: 'Build a To-Do App', completed: false }
    ];

    // Function to render the to-do list
    const renderTodos = () => {
        todoListElement.innerHTML = '';
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                <span>${todo.text}</span>
            `;
            todoListElement.appendChild(todoItem);
        });
    };

    // Function to add a new to-do
    const addTodo = () => {
        const newTodoText = newTodoInput.value.trim();
        if (newTodoText !== '') {
            todos.push({ id: todos.length + 1, text: newTodoText, completed: false });
            newTodoInput.value = '';
            renderTodos();
        }
    };

    // Function to toggle the completion status of a to-do
    const toggleCompletion = (id) => {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            renderTodos();
        }
    };

    // Event listeners
    addTodoButton.addEventListener('click', addTodo);
    todoListElement.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const id = parseInt(e.target.dataset.id, 10);
            toggleCompletion(id);
        }
    });

    // Initial render
    renderTodos();
});
