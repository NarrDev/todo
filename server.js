import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

const connect = async () => {
  await client.connect("Todo-Database");
  console.log("Ready");
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

const whitelist = ["http://localhost:5173", "http://25.68.148.181:8080/", "http://127.0.0.1:5500/"];
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

// Get folder

app.get("/getFolders", async (req, res) => {
  res.json(await folders.find().toArray());
});

// Add folder

app.post("/addFolder/:foldersName", async (req, res) => {
  if ((await folders.findOne({ name: req.params.foldersName })) !== null) {
    console.error("Folder exists");
    res.json({ error: "Folder exists" });
  } else {
    folders.insertOne({
      name: req.params.foldersName,
      removable: true,
    });
  }
});

// Delete the folder

app.delete("/deleteFolder/:foldersName", async (req, res) => {
  todos.deleteMany({ folder: req.params.foldersName });

  folders.deleteOne({ name: req.params.foldersName });
});

// Get the todos

app.get("/getTodos/:foldersName", async (req, res) => {
  res.json(
    await todos
      .find({
        folder: req.params.foldersName,
      })
      .toArray()
  );
});

// Complete the todo

app.post("/todoDone/:foldersName/:todosName", async (req, res) => {
  const todo = await todos.findOne({
    folder: req.params.foldersName,
    name: req.params.todosName,
  });
  if (todo.done) {
    todos.findOneAndUpdate(
      {
        folder: req.params.foldersName,
        name: req.params.todosName,
      },
      { $set: { done: false } }
    );
  } else {
    todos.findOneAndUpdate(
      {
        folder: req.params.foldersName,
        name: req.params.todosName,
      },
      { $set: { done: true } }
    );
  }
});

// Change the name of the folder

app.post("/changeFoldersName/:oldName/:newName", async (req, res) => {
  todos.updateMany(
    { folder: req.params.oldName },
    { $set: { folder: req.params.newName } }
  );

  folders.findOneAndUpdate(
    { name: req.params.oldName },
    { $set: { name: req.params.newName } }
  );
});
