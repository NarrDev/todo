import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const connect = async () => {
  try {
    await client.connect("Todo-Database");
    console.log("Ready");
  } catch (e) {
    console.log(e);
  }
};

connect();

const todos = client.db("Todo-Database").collection("todos");
const folders = client.db("Todo-Database").collection("folders");

import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("./dist"));

const port = 8080;

const whitelist = ["http://localhost:5173", "http://25.68.148.181:8080/"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS: not in the whitelist"));
    }
  },
};

app.use(cors(corsOptions));

app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

app.get("/getFolders", async (req, res) => {
  res.json(await folders.find().toArray());
});

app.post("/addFolder/:foldersName", async (req, res) => {
  if ((await folders.findOne({ name: req.params.foldersName })) !== null) {
    console.error("Folder exists");
    res.json({ error: "Folder exists" });
  } else {
    await folders.insertOne({
      name: req.params.foldersName,
      removable: true,
    });
    res.json();
  }
});

app.delete("/deleteFolder/:foldersName", async (req, res) => {
  await folders.deleteOne({ name: req.params.foldersName });
});

app.get("/getTodos/:foldersName", async (req, res) => {
  res.json(
    await todos
      .find({
        folder: req.params.foldersName,
        done: false,
      })
      .toArray()
  );
});

app.post(
  "/changeTodosCopletition/:foldersName/:todosName",
  async (req, res) => {
    const todo = await todos.findOne({
      folder: req.params.foldersName,
      name: req.params.todosName,
    });
    if (todo.done) {
      todos.findOneAndUpdate({ name: "test" }, { $set: { done: false } });
    } else {
      todos.findOneAndUpdate({ name: "test" }, { $set: { done: true } });
    }
  }
);
