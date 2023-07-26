
export const changeFoldersButton = document.createElement("button");

export function changeFoldersNameButton(foldersName, foldersButton) {
  changeFoldersButton.innerText = "Change";
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
  return changeFoldersButton
}
