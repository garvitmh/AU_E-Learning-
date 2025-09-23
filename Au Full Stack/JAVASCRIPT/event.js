// let btnHandler = (event)=>{
//             event.preventDefault();
//             console.log("btn clicked!!")
//         }

// let btn = document.querySelector('#btn')

// // console.log(btn)

// btn.addEventListener('click',(event)=>{
//     event.preventDefault();
//     console.log("update btn is clicked")
    
// })

// btn.addEventListener('dbclick',(event)=>{
//     event.preventDefault();
//     console.log("double click!!!")
    
// })

// function addTask() {
//     const taskInput = document.getElementById('taskInput');
//     const taskText = taskInput.value.trim();

//     if (taskText === "") {
//         alert("Please enter a task.");
//         return;
//     }

//     const taskList = document.getElementById('taskList');

//     const li = document.createElement('li');
//     li.textContent = taskText;

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = "Delete";
//     deleteBtn.onclick = function () {
//         taskList.removeChild(li);
//     };

//     li.appendChild(deleteBtn);
//     taskList.appendChild(li);

//     taskInput.value = "";
// }

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = function () {
        const newText = prompt("Edit your task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
}
