import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, profilesRouter, tipsRouter, lessonRouter } from "#routes";
import { errorHandler } from "#middlewares";
import { CLIENT_BASE_URL } from "#config";
import { initDb } from "./db/index.ts";
import "dotenv/config";

const app = express();
const port = process.env.PORT || "3000";

await initDb();

app.use(
  cors({
    origin: CLIENT_BASE_URL, // for use with credentials, origin(s) need to be specified
    credentials: true, // sends and receives secure cookies
    exposedHeaders: ["WWW-Authenticate"] // needed to send the 'refresh trigger''
  })
);

app.use(express.json(), cookieParser());

app.use("/auth", authRouter);
app.use("/profiles", profilesRouter);
app.use("/tips", tipsRouter);
app.use("/lessons", lessonRouter);

app.get("/", (req, res) => {
  res.send("Sakura Bloom 🌸 Backend alive!");
});

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Not Found 😵‍💫" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Sakura Bloom 🌸 Backend listening on port http://localhost:${port}`);
});
