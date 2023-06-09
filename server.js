import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://Narrative:g33Q9M4WSFawzn5@cluster0.xn9tfjf.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

const data = {
  users: {
    Narrative: {
      folders: {
        Today: [
          {
            description: "task 0",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 1",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 2",
            "created at": "31.12.2023 23:59",
          },
        ],
        Tomorrow: [
          {
            description: "task 0",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 1",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 2",
            "created at": "31.12.2023 23:59",
          },
        ],
        Complited: [
          {
            description: "task",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 1",
            "created at": "31.12.2023 23:59",
          },
          {
            description: "task 2",
            "created at": "31.12.2023 23:59",
          },
        ],
      },
    },
  },
};

app.get("/getData/:username", (req, res) => {
  if (Boolean(data.users[req.params.username])) {
    res.json(data.users[req.params.username]);
    console.log(1);
  } else {
    res.json(new Error("User doesn't exist!"));
  }
});

app.post("/test", async (req, res) => {
  try {
    const myColl = client.collection("test");
    const result = await myColl.insertOne(req.body);

    res.json(result);
  } catch (error) {
    res.json(new Error("User doesn't exist!"));
  }
});
