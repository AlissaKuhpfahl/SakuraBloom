import express from "express";
// import { CLIENT_BASE_URL } from '#config';

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Sakura Bloom 🌸 Backend alive!");
});

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Not Found 😵‍💫" });
});

app.listen(port, () => {
  console.log(`Sakura Bloom 🌸 Backend listening on port ${port}`);
});
