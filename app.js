// Selector
const todoInput = document.querySelector('.todo-input')
const todoBtn = document.querySelector('.todo-btn')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event listeners
document.addEventListener('DOMContentLoaded', updateUI)
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', checkOrDelete)
filterOption.addEventListener('click', filterTodo)

// Functions
function addTodo(e) {
  // prevent refresh on submit
  e.preventDefault()

  // bikin todo div
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // bikin li
  const newTodo = document.createElement('input')
  if (!todoInput.value) {
    alert('Can not use empty value')
    return
  }
  newTodo.value = todoInput.value
  newTodo.classList.add('todo-item')

  // save to local storage
  saveToLocal(newTodo.value)

  newTodo.addEventListener('change', function () {
    editTodo(todo, newTodo.value)
  })

  // gabung
  todoDiv.appendChild(newTodo)

  // Checkmark btn
  const checkBtn = document.createElement('button')
  checkBtn.classList.add('check-btn')
  checkBtn.innerHTML = '<i class="fas fa-check"></i>'

  // gabung
  todoDiv.appendChild(checkBtn)

  // Trash btn
  const trashBtn = document.createElement('button')
  trashBtn.classList.add('trash-btn')
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>'

  // gabung
  todoDiv.appendChild(trashBtn)

  // gabung ke list
  todoList.appendChild(todoDiv)

  // clear input value
  todoInput.value = ''

  location.reload()
}

function checkOrDelete(e) {
  const target = e.target.classList.value
  const todo = e.target.parentNode
  if (target === 'trash-btn') {
    todo.classList.add('fall')
    delTodoFromLocal(todo)
    todo.addEventListener('transitionend', () => todo.remove())
  }
  if (target === 'check-btn') {
    todo.classList.toggle('done')
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('done')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('done')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

function loadLocalTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  return todos
}

function updateLocalTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function saveToLocal(todo) {
  const todos = loadLocalTodos()
  todos.push(todo)
  updateLocalTodos(todos)
}

function editTodo(oldTodo, editedTodo) {
  const todos = loadLocalTodos()
  todos[todos.indexOf(oldTodo)] = editedTodo
  updateLocalTodos(todos)
}

function updateUI() {
  const todos = loadLocalTodos()
  todos.forEach((todo) => {
    // bikin todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // bikin li
    const newTodo = document.createElement('input')
    newTodo.value = todo
    newTodo.classList.add('todo-item')

    newTodo.addEventListener('change', () => editTodo(todo, newTodo.value))

    // gabung
    todoDiv.appendChild(newTodo)

    // Checkmark btn
    const checkBtn = document.createElement('button')
    checkBtn.classList.add('check-btn')
    checkBtn.innerHTML = '<i class="fas fa-check"></i>'

    // gabung
    todoDiv.appendChild(checkBtn)

    // Trash btn
    const trashBtn = document.createElement('button')
    trashBtn.classList.add('trash-btn')
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>'

    // gabung
    todoDiv.appendChild(trashBtn)

    // gabung ke list
    todoList.appendChild(todoDiv)
  })
}

function delTodoFromLocal(todo) {
  const todos = loadLocalTodos()
  const item = todo.childNodes[0].value
  const itemIndex = todos.indexOf(item)
  todos.splice(itemIndex, 1)
  updateLocalTodos(todos)
}
