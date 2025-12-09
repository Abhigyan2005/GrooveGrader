import express from 'express';
import { UserRoast } from '../controllers/Gemini.controller.js';
const router = express.Router();

router.post('/roast', UserRoast);

export default router;