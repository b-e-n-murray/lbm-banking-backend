import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client } from "pg";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT_NUMBER = process.env.PORT ?? 4000;
const client = new Client(process.env.DATABASE_URL);
client.connect();


app.get("/users/:username/:password", async(req, res) => {
  try {
    const username = req.params.username;
    const password = req.params.password;
    console.log("trying with username: ",username, "and password: ",password)
    const queryResponse = await client.query(`
    SELECT * FROM users
    WHERE username = '${username}' AND password = '${password}'`)
    res.status(200).json(queryResponse.rows)
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "could not find user" });
  }
})


app.get("/users", async(req, res) => {
  try {
    const queryResponse = await client.query(`
    SELECT * FROM users`)
    res.status(200).json(queryResponse.rows)
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "could get user data" });
  }
})


app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on port ${PORT_NUMBER}!`);
});
