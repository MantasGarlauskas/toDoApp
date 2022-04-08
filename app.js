"use strict";
class Task {
    constructor(_taskName, _date) {
        this._taskName = _taskName;
        this._date = _date;
    }
    get taskName() {
        return this._taskName;
    }
    get date() {
        return this._date;
    }
    set taskName(taskName) {
        this._taskName = taskName;
    }
    set date(date) {
        this._date = date;
    }
}
const btnAdd = document.getElementById("addTask");
const btnDelete = document.getElementById("deleteTask");
const inpTask = document.getElementById("task");
const inpDate = document.getElementById("date");
const output = document.getElementById("output");
let tasks = [];
// // add example tasks
// const jonas: Task = new Task("jonas", "jonaitis");
// const petras: Task = new Task("petras", "petraitis");
// tasks.push(jonas);
// tasks.push(petras);
let jsonString = localStorage.getItem("task");
if (jsonString != null) {
    let data = JSON.parse(jsonString);
    data.forEach((obj) => {
        let prod = new Task(obj._taskName, obj._date);
        tasks.push(prod);
    });
}
let outputTasks = () => {
    if (output != null) {
        output.innerHTML = "";
        tasks.forEach((task, indeksas) => {
            output.innerHTML += `
      <div class="form-control">
         <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onclick="deleteTask('${indeksas}')">
        <label class="form-check-label" for="flexCheckDefault">
          ${task.taskName} - due date ${task.date}
        </label>
      </div><br>
      `;
        });
    }
};
let deleteTask = (indeksas) => {
    tasks.splice(indeksas, 1);
    outputTasks();
    localStorage.setItem("task", JSON.stringify(tasks));
};
if (btnAdd != null) {
    btnAdd.onclick = () => {
        tasks.push(new Task(inpTask.value, inpDate.value));
        outputTasks();
        localStorage.setItem("task", JSON.stringify(tasks));
    };
}
if (btnDelete != null) {
    btnDelete.onclick = () => {
        localStorage.removeItem("task");
        tasks = [];
        outputTasks();
    };
}
outputTasks();
