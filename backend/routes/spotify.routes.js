import express from 'express'
import {callback, spotifylogin, userprofile, userArtists, userTracks} from "../controllers/Spotify.controller.js"
const router = express.Router();


router.get('/login', spotifylogin);
router.get('/callback', callback);


router.get('/profile', userprofile);
router.get('/artists', userArtists);
router.get('/tracks', userTracks);

export default router;