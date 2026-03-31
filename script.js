const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

function addTask() {
    const task = input.value.trim();
    if (task === "") return;

    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = task;
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.classList.add("delete-btn");

    delBtn.addEventListener("click", () => {
        li.remove();
    });

    span.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);

    input.value = "";
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});
