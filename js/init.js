import { deleteFolder } from "./deleteFolder";
import { addFolder } from "./addFolder";
import { changeFoldersNameButton } from "./changeFoldersName";

const folderList = document.querySelector(
  ".todo-folders .folders .btn-group-vertical"
);

// Fetch to get the folder-list
const folders = await fetch("http://localhost:8080/getFolders", {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((res) => res.json());

// Initialization of folder-list
export const initFolder = async function (i) {
  const foldersDiv = document.createElement("div");
  foldersDiv.className = "folder-div";
  const deleteFolderButton = deleteFolder(folders[i], foldersName, foldersDiv);
  const changeFoldersButton = changeFoldersNameButton(folders[i], foldersName);
  folderList.appendChild(foldersDiv);
  foldersDiv.appendChild(foldersName);
  foldersDiv.appendChild(changeFoldersButton);
  foldersDiv.appendChild(deleteFolderButton);
};

export async function init() {
  for (let i = 0; i < folders.length; i++) {
    await addFolder(folders[i].name);
    if (folders[i].removable) {
      initFolder(i);
    }
  }
}
