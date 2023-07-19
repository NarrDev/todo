import { deleteFolder } from "./deleteFolder";
import { addFolder } from "./addFolder";
import { changeFoldersNameButton } from "./changeFoldersName";

export async function init() {
  // Fetch to get the folder-list
  const folders = await fetch("http://localhost:8080/getFolders", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());

  // Initialisation of folder-list
  for (let i = 0; i < folders.length; i++) {
    const foldersName = await addFolder(folders[i].name);
    if (folders[i].removable) {
      deleteFolder(folders[i], foldersName);
      changeFoldersNameButton(folders[i], foldersName);
    }
  }
}
