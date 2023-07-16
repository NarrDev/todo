export async function init() {
  const folderList = document.querySelector(
    ".todo-folders .folders .btn-group-vertical"
  );
  const todoList = document.querySelector(
    ".todoList .todos .btn-group-vertical"
  );
  const todoInfo = document.querySelector(".todo-info .info .info-list");
  const infoContainer = document.querySelector(".todo-info");
  const addFoderButton = document.getElementById("add-folder-button");

  // Fetch to get the folder-list
  const folders = await fetch("http://localhost:8080/getFolders", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });

  // Delete folder
  const deleteFolderButtonFunction = (folder, folderButton) => {
    if (folder.removable) {
      const deleteFolderButton = document.createElement("button");
      deleteFolderButton.innerText = "Delete";
      folderList.appendChild(deleteFolderButton);
      deleteFolderButton.addEventListener("click", async () => {
        folderList.removeChild(await folderButton);
        folderList.removeChild(deleteFolderButton);
        await fetch("http://localhost:8080/deleteFolder/" + folder.name, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => res.json())
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };

  // Add folder
  const addFolder = async (foldersName) => {
    const folderButton = document.createElement("button");
    folderButton.type = "button";
    folderButton.className = "btn btn-primary";
    folderButton.innerText = foldersName;

    folderButton.addEventListener("click", async () => {
      todoList.innerHTML = "";
      const todos = await fetch(
        `http://localhost:8080/getTodos/${foldersName}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(),
        }
      ).then((res) => res.json());

      for (let i = 0; i < todos.length; i++) {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-div";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const todo = document.createElement("button");
        todo.className = "btn btn-primary";
        todo.innerText = todos[i].name;

        checkbox.addEventListener("change", () => {
          fetch(`/changeTodosCopletition/${foldersName}/${todos[i].name}`);
          if (todo.innerHTML === `<s>${todos[i].name}</s>`) {
            todo.innerHTML = todos[i].name;;
          } else {
            todo.innerHTML = `<s>${todos[i].name}</s>`;
          }
        });

        todoList.appendChild(todoDiv);
        todoDiv.appendChild(checkbox);
        todoDiv.appendChild(todo);
      }
    });

    folderList.appendChild(folderButton);

    return folderButton;
  };

  addFoderButton.addEventListener("click", async () => {
    const foldersName = prompt("Name your new folder:");
    if (foldersName) {
      fetch(`http://localhost:8080/addFolder/${foldersName}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(),
      });

      deleteFolderButtonFunction(
        { name: foldersName, removable: true },
        addFolder(foldersName)
      );
    }
  });

  // Change folders name

  // Initialisation of folder-list
  for (let i = 0; i < folders.length; i++) {
    deleteFolderButtonFunction(folders[i], addFolder(folders[i].name));
  }
}
