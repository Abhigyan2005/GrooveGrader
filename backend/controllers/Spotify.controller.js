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
  let scope = "user-read-private user-read-email";

  console.log(state);
  res.cookie("spotify_state", state, {
    httpOnly: true, // prevents xss attacks
    secure: process.env.NODE_ENV === "production", // only sends cookie on HTTPS connections
    sameSite: "none",
    maxAge: 5 * 60 * 1000,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: clientID,
        scope: scope,
        redirect_uri: RedirectURI,
        state: state,
      })
  );
};

export const callback = async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;

  const sentState = req.cookies.spotify_state;

  console.log("Spotify sent state:", state);
  console.log("Cookie state:", req.cookies.spotify_state);
  if (!code || !state) {
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
    console.log(access_token);

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "none",
      maxAge: 5 * 60 * 1000,
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
