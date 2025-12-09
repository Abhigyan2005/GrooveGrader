import express from "express";
import dotenv from "dotenv";
import spotifyauth from "./routes/spotify.routes.js";
import geminiAPI from "./routes/gemini.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://groove-grader.vercel.app",
    credentials: true,
  })
);

app.options("/*", cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", spotifyauth);
app.use("/gemini", geminiAPI);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
