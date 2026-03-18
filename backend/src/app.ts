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

function normalizeOrigin(origin: string): string {
  try {
    return new URL(origin).origin;
  } catch {
    return origin.replace(/\/+$/, "");
  }
}

const configuredOrigins = [
  CLIENT_BASE_URL,
  ...(process.env.CLIENT_BASE_URLS?.split(",") ?? []).map(value => value.trim())
]
  .filter(Boolean)
  .map(normalizeOrigin);

const allowedOrigins = new Set(configuredOrigins);

await initDb();

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (curl, server-to-server, health checks).
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(normalizeOrigin(origin))) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"));
    },
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
