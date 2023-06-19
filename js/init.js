import { fetching } from "./fetchToServer";
export async function init(username) {
  const folderList = document.querySelector(
    ".todo-folders .folders .btn-group-vertical"
  );
  const todoList = document.querySelector(
    ".todoList .todos .btn-group-vertical"
  );
  const todoInfo = document.querySelector(".todo-info .info .info-list");
  const infoContainer = document.querySelector(".todo-info");

  const data = await fetch("http://localhost:8080/getData/" + username, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(1);
    });

  const dataKeys = Object.keys(data.folders);

  // Todo folders
  for (let i = 0; i < dataKeys.length; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.innerText = dataKeys[i];
    button.setAttribute("data-index", i);
    button.addEventListener("click", () => {
      todoList.innerHTML = "";

      const todos = data.folders[dataKeys[i]];

      // Todo List
      for (let i = 0; i < todos.length; i++) {
        const todoDiv = document.createElement("div"); 
        todoDiv.className = 'todo-div'

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.name = todos[i].description;
        checkBox.value = todos[i].description;
        checkBox.className = "todo-checkbox";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "btn btn-primary";
        button.innerText = todos[i].description;
        button.addEventListener("click", () => {
          // Todo Infos

          todoInfo.innerHTML = "";

          const descriptionLi = document.createElement("li");
          descriptionLi.innerText = todos[i].description;
          descriptionLi.className = "info-list-item";

          const createdAtLi = document.createElement("li");
          createdAtLi.innerText = todos[i]["created at"];
          createdAtLi.className = "info-list-item";

          todoInfo.appendChild(descriptionLi);
          todoInfo.appendChild(createdAtLi);
          infoContainer.style.display = "block";
        });

        todoDiv.appendChild(checkBox);
        todoDiv.appendChild(button);
        todoList.appendChild(todoDiv)
      }
    });
    folderList.appendChild(button);
  }
}

