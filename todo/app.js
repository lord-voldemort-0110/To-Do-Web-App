// get the input and button elements
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');

// get the pending and completed list elements
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');

// create an array to hold the tasks
let tasks = [];

// function to render the tasks in the appropriate list
function renderTasks() {
  // clear the lists first
  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  // loop through the tasks array and create an li element for each task
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerText = task.name;

    // if the task is completed, add the completed class to the li element
    if (task.completed) {
      li.classList.add('completed');
      completedList.appendChild(li);
    } else {
      // add a checkbox and delete button for pending tasks
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('click', () => {
        task.completed = !task.completed;
        markTask(task.id, task.completed);
      });

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
      });

      li.appendChild(checkbox);
      li.appendChild(deleteButton);
      pendingList.appendChild(li);
    }
  });
}

// function to add a task to the array and render the tasks
function addTask(name) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'todo.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    tasks = JSON.parse(xhr.responseText);
    renderTasks();
  };
  xhr.send(`action=add&name=${name}`);
}

// function to delete a task from the array and render the tasks
function deleteTask(id) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'todo.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    tasks = JSON.parse(xhr.responseText);
    renderTasks();
  };
  xhr.send(`action=delete&id=${id}`);
}

// function to mark a task as completed or pending and render the tasks
function markTask(id, completed) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'todo.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    tasks = JSON.parse(xhr.responseText);
    renderTasks();
  };
  xhr.send(`action=mark&id=${id}&completed=${completed}`);
}

// add event listener to the add button
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const name = taskInput.value.trim();
  if (name) {
    addTask(name);
    taskInput.value = '';
  }
});

// get the initial list of tasks on page load
const xhr = new XMLHttpRequest();
xhr.open('GET', 'todo.php?action=get');
xhr.onload = () => {
  tasks = JSON.parse(xhr.responseText);
  renderTasks();
};
xhr.send();
