const folderList = document.querySelector(
  ".todo-folders .folders .btn-group-vertical"
);

export function changeFoldersNameButton(foldersName, foldersButton) {
  const changeFoldersButton = document.createElement("button");
  changeFoldersButton.innerText = "Change";
  folderList.appendChild(changeFoldersButton);
  changeFoldersButton.addEventListener("click", () => {
    const newName = prompt("New name:");
    foldersButton.innerText = newName;

    // Fetch to change folder
    fetch(
      `http://localhost:8080/changeFoldersName/${foldersName.name}/${newName}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  });
}
