const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = JSON.parse(localStorage.getItem('todos'))

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? 'completed' : '';
        li.addEventListener('click', () => {
            todos[index].completed = !todos[index].completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'ลบ';
        deleteBtn.onclick = () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodos();
        };
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
});

renderTodos();