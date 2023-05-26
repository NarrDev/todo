import { fetching } from "./fetchToServer";
export async function init(username, password) {
  const folderList = document.querySelector(
    "body > div.section > div.todo-folders > div.folders > div.btn-group-vertical"
  );
  const data = await fetching(`getData/${username}`);
  async function openFolders(folderName, username) {
    const data = await fetching(`${username}/${folderName}`);
    console.log(data);
  }
  console.log(data);
  const dataKeys = Object.keys(data);
  for (let i = 0; i < dataKeys.length; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary";
    button.setAttribute("data-name", dataKeys[i]);
    button.innerText = dataKeys[i];
    button.addEventListener("click", () => { openFolders(dataKeys[i], username) });
    folderList.appendChild(button);
  }
}
