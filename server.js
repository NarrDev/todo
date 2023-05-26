import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("./dist"));

const port = 8080;

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

const username = "Narrative";
const password = "qwerty123";
const data = {
  users: {
    Narrative: {
      folders: {
        Today: [{
          description: 'do some stuff',
          "created at": "31.12.2023 23:59"
        }],
        Tomorrow: "Tomorrow",
        Complited: "Complited",
      },
    },
  },
};

app.post("/getData/:username", (req, res) => {
  if (req.params.username === username) {
    res.json(data.users[req.params.username].folders);
  } else {
    res.status(403).send({ error: "Wrong Data!" });
  }
});

app.post("/:username/:folderName", (req, res) => {
  console.log(1);
  if (Boolean(data.users[req.params.username].folders[req.params.folderName])) {
    res.json(data.users[req.params.username].folders[req.params.folderName]);
  }
});
