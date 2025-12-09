import dotenv from "dotenv";
import { getRandomString } from "../utils/token.js";
import qs from "qs";
import axios from "axios";

dotenv.config();

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const RedirectURI = process.env.REDIRECT_URI;

export const spotifylogin = (req, res) => {
  const state = getRandomString(16);
  let scope = "user-read-private user-read-email user-top-read";
  res.cookie("spotify_state", state, {
    httpOnly: true, // prevents xss attacks
    secure: process.env.NODE_ENV === "production", // only sends cookie on HTTPS connections
    sameSite: "none",
    maxAge: 4*60 * 60 * 1000,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: clientID,
        scope: scope,
        redirect_uri: RedirectURI,
        state: state,
        show_dialog: true,
      })
  );
};

export const callback = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  const sentState = req.cookies.spotify_state;

  if (!code || sentState != state) {
    return res.send({
      success: false,
      message: "wrong or missing state or code.",
    });
  }

  try {
    const tokenresponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: RedirectURI,
      }),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(clientID + ":" + clientSecret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenresponse.data;

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.redirect("http://127.0.0.1:5173/dashboard");
  } catch (error) {
    console.log("error in callback function");
  }
};

export const userprofile = async (req, res) => {
  const token = req.cookies.access_token;
  const user = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  res.send(user.data);
};

export const userAlbums = async (req, res) => {
  const token = req.cookies.access_token;
  const albums = await axios.get("https://api.spotify.com/v1/me/albums", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  res.send(albums.data);
};

export const userArtists = async (req, res) => {
  const token = req.cookies.access_token;
  const artists = await axios.get("https://api.spotify.com/v1/me/top/artists", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  res.send(artists.data);
};


export const userTracks = async (req, res) => {
  const token = req.cookies.access_token;
  const tracks = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  res.send(tracks.data);
}

export const userLogout = (req, res) => {
  res.clearCookie("spotify_state", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });

  return res.json({ success: true }); // gotta return if not then browser waits then aborts 
}

