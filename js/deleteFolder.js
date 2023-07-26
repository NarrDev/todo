const folderList = document.querySelector(
  ".todo-folders .folders .btn-group-vertical"
);
import { changeFoldersButton } from "./changeFoldersName";

export function deleteFolder(folder, folderButton, foldersDiv) {
  const deleteFolderButton = document.createElement("button");
  deleteFolderButton.innerText = "Delete";
  deleteFolderButton.addEventListener("click", async () => {
    folderList.removeChild(foldersDiv)
    
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
  })
  return deleteFolderButton
}
