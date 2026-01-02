const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PORT = 5050;

app.use(cors());               //  enable CORS
app.use(express.json());
app.use(express.static("public"));

const MONGO_URL = "mongodb://admin:qwerty@localhost:27018/?authSource=admin";
const client = new MongoClient(MONGO_URL);

/* GET all users */
app.get("/getUsers", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("apnacollege-db");
        const users = await db.collection("users").find({}).toArray();
        client.close();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

/* ADD user */
app.post("/addUser", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("apnacollege-db");
        await db.collection("users").insertOne(req.body);
        client.close();
        res.json({ message: "User added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding user" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
