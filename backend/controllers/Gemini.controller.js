import dotenv from "dotenv";
import axios from "axios";
import { roast } from "../utils/apiRequest.js";

dotenv.config();

export const UserRoast = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const [artistRes, trackRes] = await Promise.all([
      axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("https://api.spotify.com/v1/me/top/tracks", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    const artists = artistRes.data.items.map((a) => a.name).slice(0, 10);
    const tracks = trackRes.data.items.map((t) => t.name).slice(0, 10);
    const genres = artistRes.data.items.flatMap((a) => a.genres);

    const artistString = artists.join(", ");
    const trackString = tracks.join(", ");
    const genreString = genres.join(", ");

    const result = await roast(artistString, trackString, genreString);

    res.send({ roast: result });
  } catch (err) {
    console.error("Error generating roast:", err.message);
    res.status(500).json({ message: "Error generating roast" });
  }
};
