import "./styles/main.scss";
import * as bootstrap from "bootstrap";
import Alert from "bootstrap/js/dist/alert";
import { Tooltip, Toast, Popover } from "bootstrap";

import { init } from "./js/init.js";

init("Narrative");

const postData = async () => {
  const result = await fetch("http://localhost:8080/test", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ name: "Vova" }),
  }).then((res) => res.json());

  console.log(result);
};

postData();
