// On app load, get all tasks from localStorage
window.onload = loadTasks;


function loadTasks() {
  // check if localStorage has any tasks
  // if not then return
  if (localStorage.getItem("tasks") == null) return;

  // Get the tasks from localStorage and convert it to an array
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  // Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="btn" ${task.completed ? 'checked' : ''}>
          <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <span class="close-btn" onclick="removeTask(this)"></span>`;
    list.insertBefore(li, list.children[0]);
  });
}

function addTask() {
  const task = document.querySelector("form input");
  const list = document.querySelector("ul");
  // return if task is empty
  if (task.value === "") {
    alert("Please add some task!");
    return false;
  }
  // check is task already exist
  if (document.querySelector(`input[value="${task.value}"]`)) {
    alert("Task already exist!");
    return false;
  }

  // add task to local storage
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));

  // create new task element
  const newTask = document.createElement("li");
  newTask.innerHTML = `<input type="checkbox" class="btn" onclick="taskComplete(this)"> </input>
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <span class="close-btn" onclick="removeTask(this)"></span>`;
  list.insertBefore(newTask, list.children[0]);
  task.value = "";
  renderTaskCounter();



} 

function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.nextElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
  renderTaskCounter();
  
}

function removeTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
  renderTaskCounter();

}


// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach(task => {
    if (task.task === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach(task => {
    if (task.task === currentTask) {
      task.task = event.value;
    }
  });
  // update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//click the enter key without reloading the page
document.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
}
);




//clear completed tasks
function clearCompleted() {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach(task => {
    if (task.completed) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.querySelectorAll(".completed").forEach(task => {
    task.parentElement.remove();
  });
}

// render task counter
function renderTaskCounter() {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  let count = 0;
  tasks.forEach(task => {
    for (let key in task) {
      if (task[key] === false) {
        count++;
      }
    }
    const taskStrig = count === 1 ? "task" : "tasks";
    document.getElementById("todo-count").innerHTML = `${count} ${taskStrig} left`;

  });   

 }
 renderTaskCounter();




//FILTER ACTIVE TASKS

function filterSelection(filter) {
  var tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  
  tasks.forEach(task => {
    if (filter === "all") {
      document.querySelector(`input[value="${task.task}"]`).parentElement.style.display = "flex";
    } else if (filter === "active") {
      if (!task.completed) {
        document.querySelector(`input[value="${task.task}"]`).parentElement.style.display = "flex";
      } else {
        document.querySelector(`input[value="${task.task}"]`).parentElement.style.display = "none";
      }
    } else if (filter === "completedTask") {
      if (task.completed) {
        document.querySelector(`input[value="${task.task}"]`).parentElement.style.display = "flex";
      } else {
        document.querySelector(`input[value="${task.task}"]`).parentElement.style.display = "none";
      }
    }
  });
}

//ffilter selection
var filterMob = document.getElementById("filters");
var btns = filterMob.getElementsByClassName("btn-filter");


  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active-btn");
      current[0].className = current[0].className.replace(" active-btn", "");
      this.className += " active-btn";
      filterSelection(this.value);
    });
  }







