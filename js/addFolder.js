const folderList = document.querySelector(
  ".todo-folders .folders .btn-group-vertical"
);
const todoList = document.querySelector(".todoList .todos .btn-group-vertical");
const addFolderButton = document.getElementById("add-folder-button");

import { initFolder } from "./init";

export async function addFolder(foldersName) {
  // Folder-button in the folder-list
  const folderButton = document.createElement("button");
  folderButton.type = "button";
  folderButton.className = "btn btn-primary";
  folderButton.innerText = foldersName;

  folderButton.addEventListener("click", async () => {
    todoList.innerHTML = "";

    // Fetch for todos
    const todos = await fetch(`http://localhost:8080/getTodos/${foldersName}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json());

    // Todos onclick initialisation
    for (let i = 0; i < todos.length; i++) {
      const todoDiv = document.createElement("div");
      todoDiv.className = "todo-div";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const todo = document.createElement("button");
      todo.type = "button";
      todo.className = "btn btn-primary";
      todo.innerText = todos[i].name;
      if (todos[i].done) {
        todo.classList.add("line-through");
        checkbox.checked = true;
      }

      // Checkbox for completing todos
      checkbox.addEventListener("change", () => {
        fetch(
          `http://localhost:8080/todoDone/${foldersName}/${todos[i].name}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (todo.classList.contains("line-through")) {
          todo.classList.remove("line-through");
        } else {
          todo.classList.add("line-through");
        }
      });

      todoList.appendChild(todoDiv);
      todoDiv.appendChild(checkbox);
      todoDiv.appendChild(todo);
    }
  });

  folderList.appendChild(folderButton);

  return folderButton;
}

// Add-folder-button at the begining of the folder-list
addFolderButton.addEventListener("click", async() => {
  const foldersName = document.getElementById("folders-name").value;
  if (foldersName) {
    fetch(`http://localhost:8080/addFolder/${foldersName}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  initFolder()
});
