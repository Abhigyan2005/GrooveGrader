import express from 'express'
import {callback, spotifylogin, userprofile, userAlbums, userArtists, userTracks,userLogout} from "../controllers/Spotify.controller.js"
const router = express.Router();


router.get('/login', spotifylogin);
router.get('/callback', callback);


router.get('/profile', userprofile);
router.get('/albums', userAlbums);
router.get('/artists', userArtists);
router.get('/tracks', userTracks);

router.post('/logout', userLogout);

export default router;