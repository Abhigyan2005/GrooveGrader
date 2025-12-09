import dotenv from "dotenv";
import axios from "axios";
import { roast } from "../utils/apiRequest.js";

dotenv.config();
export const UserRoast = async (req, res) => {
  const cookies = req.headers.cookie;
  try {
    const artistRes = await axios.get("http://127.0.0.1:8080/api/artists", {
      headers: { Cookie: cookies },
    });
    const trackRes = await axios.get("http://127.0.0.1:8080/api/tracks", {
      headers: { Cookie: cookies },
    });

    const artists = artistRes.data.items.map((a) => a.name).slice(0, 10);
    const tracks = trackRes.data.items.map((t) => t.name).slice(0, 10);
    const genres = artistRes.data.items.flatMap((a) => a.genres);

    const artistString = artists.join(", ");
    const trackString = tracks.join(", ");
    const genreString = genres.join(", ");
    const result = await roast(artistString, trackString, genreString);

    res.send({ roast: result });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error generating roast");
  }
};
