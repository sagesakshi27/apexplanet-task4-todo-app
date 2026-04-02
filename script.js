const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const emptyMsg = document.getElementById("emptyMsg");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

function getFilteredTasks() {
    return tasks.map((task, index) => ({ ...task, index }))
        .filter(task => {
            if (currentFilter === "completed") return task.completed;
            if (currentFilter === "pending") return !task.completed;
            return true;
        });
}

function renderTasks() {
    list.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    if (filteredTasks.length === 0) {
        emptyMsg.style.display = "block";
        return;
    } else {
        emptyMsg.style.display = "none";
    }

    filteredTasks.forEach(taskObj => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.innerText = taskObj.text;

        if (taskObj.completed) {
            li.classList.add("completed");
        }

        li.onclick = (e) => {
            if (e.target.classList.contains("delete-btn")) return;

            tasks[taskObj.index].completed = !tasks[taskObj.index].completed;
            saveTasks();
            renderTasks();
        };

        span.ondblclick = () => {
            const newText = prompt("Edit task:", taskObj.text);
            if (newText && newText.trim() !== "") {
                tasks[taskObj.index].text = newText.trim();
                saveTasks();
                renderTasks();
            }
        };

        const delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.classList.add("delete-btn");
        delBtn.onclick = () => {
            tasks.splice(taskObj.index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });

    saveTasks();
    renderTasks();

    input.value = "";
}

addBtn.onclick = addTask;

input.onkeydown = (e) => {
    if (e.key === "Enter") addTask();
};

renderTasks();
