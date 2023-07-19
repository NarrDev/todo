const folderList = document.querySelector(
  ".todo-folders .folders .btn-group-vertical"
);

export function deleteFolder(folder, folderButton) {
  const deleteFolderButton = document.createElement("button");
  deleteFolderButton.innerText = "Delete";
  folderList.appendChild(deleteFolderButton);
  deleteFolderButton.addEventListener("click", async () => {
    folderList.removeChild(await folderButton);
    folderList.removeChild(deleteFolderButton);

    // Fetch to delete folder
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
