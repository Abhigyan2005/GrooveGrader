import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

export async function roast(artists, tracks, genres) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Roast this person based on:
      - Artists: ${artists}
      - Tracks: ${tracks}
      - Genres: ${genres}
      Keep it funny, slightly toxic, and around 80 words.
    `,
  });

  return response.text;
}
