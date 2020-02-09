// lets define ui variables
const taskForm = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// lets load event listeners
loadEventListeners();

// function for loading event listeners
function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  taskForm.addEventListener('submit', addTask);
  // add filter event
  filter.addEventListener('keyup', filterTasks);
  // add remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
}

// get tasks from the local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.forEach(function(task){
    // create list item element
    const li = document.createElement('li');
    // add classname
    li.className = 'collection-item';
    // create text node and append it to li
    li.appendChild(document.createTextNode(task));
    // create link for remove icon
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add the icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append the link to li
    li.appendChild(link);
    
    // append li to ul
    taskList.appendChild(li);
  })
}

// creatin function for addin task to tasklist
function addTask(e){
  if(taskInput.value === ''){
    alert('Add task')
  }
  else{

      // create list item element
      const li = document.createElement('li');
      // add classname
      li.className = 'collection-item';
      // create text node and append it to li
      li.appendChild(document.createTextNode(taskInput.value));
      // create link for remove icon
      const link = document.createElement('a');
      // add class
      link.className = 'delete-item secondary-content';
      // add the icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>'
      // append the link to li
      li.appendChild(link);
      
      // append li to ul
      taskList.appendChild(li);

      // store task to local storage
      storeTaskInLocalStorage(taskInput.value);

      // clear the task input
      taskInput.value = '';
      // prevent defaul event
      e.preventDefault();
      }

}

// store task to local storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// create filter function
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  });
}

// create remove task function
function removeTask(e){
  if (e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  

  // remove from local storage
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if (localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks function
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

