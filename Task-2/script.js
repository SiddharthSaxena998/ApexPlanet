const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.getAttribute('data-section');
    sections.forEach(sec => sec.classList.toggle('active', sec.id === target));
  });
});

const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  toggleThemeBtn.textContent = body.classList.contains('light') ? '🌞' : '🌙';
});

const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formMsg.textContent = 'Please fill in all required fields.';
    formMsg.style.color = '#ff4c4c';
    return;
  }

  if (!validateEmail(email)) {
    formMsg.textContent = 'Please enter a valid email.';
    formMsg.style.color = '#ff4c4c';
    return;
  }

  formMsg.textContent = 'Thank you for contacting us!';
  formMsg.style.color = '#6b73ff';
  contactForm.reset();
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const categoryBtns = document.querySelectorAll('.category-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos(filter = 'all') {
  todoList.innerHTML = '';
  const filteredTodos = todos.filter(todo =>
    filter === 'all' ? true : todo.category === filter
  );

  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add('completed');

    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <button class="complete-btn" aria-label="Mark task complete">✔️</button>
        <button class="delete-btn" aria-label="Delete task">❌</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function toggleComplete(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos(getActiveCategory());
  }
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  renderTodos(getActiveCategory());
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getActiveCategory() {
  const activeBtn = document.querySelector('.category-btn.active');
  return activeBtn ? activeBtn.id : 'all';
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (!taskText) return;

  const newTodo = {
    id: Date.now(),
    text: taskText,
    completed: false,
    category: getActiveCategory()
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos(getActiveCategory());
  todoInput.value = '';
});

categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTodos(btn.id);
  });
});

todoList.addEventListener('click', e => {
  const parent = e.target.closest('.todo-item');
  if (!parent) return;
  const id = Number(parent.dataset.id);
  if (e.target.classList.contains('complete-btn')) toggleComplete(id);
  else if (e.target.classList.contains('delete-btn')) deleteTodo(id);
});

renderTodos();