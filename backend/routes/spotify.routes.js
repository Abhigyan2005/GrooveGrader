import express from 'express'
import {callback, spotifylogin, userprofile, userAlbums, userArtists, userTracks} from "../controllers/Spotify.controller.js"
const router = express.Router();


router.get('/login', spotifylogin);
router.get('/callback', callback);


router.get('/profile', userprofile);
router.get('/albums', userAlbums);
router.get('/artists', userArtists);
// router.get('/genres', userGenre);
router.get('/tracks', userTracks);
export default router;