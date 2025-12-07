import express from 'express'
import dotenv from 'dotenv'
import spotifyauth from "./routes/spotify.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()

const app = express();

app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        credentials: true,
    })
)

app.use(express.json()); 
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send('hello world')
})

app.use('/api', spotifyauth);

app.get("/logout", (req, res) => {
  res.clearCookie("spotify_state");
  res.clearCookie("access_token");
  res.send("Logged out, you can now login fresh");
});


app.listen(8080);