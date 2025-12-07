import express from 'express'
import {callback, spotifylogin, userprofile} from "../controllers/Spotify.controller.js"
const router = express.Router();


router.get('/login', spotifylogin);
router.get('/callback', callback);


router.get('/profile', userprofile);

export default router;