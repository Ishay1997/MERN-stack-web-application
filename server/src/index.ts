import { config } from 'dotenv';
config();
import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import Deck from "./models/Deck";

const PORT = 5000;
const app = express();
app.use(cors({origin: "*",}));

// Middleware to parse JSON request bodies
app.use(express.json());
app.get("/decks",async (req: Request, res: Response) => {
const decks = await Deck.find();
res.json(decks);
});
// Define a POST route to create a new deck
app.post("/decks", async (req: Request, res: Response) => {
    try {
        const newDeck = new Deck({ title: req.body.title, });
        const createDeck = await newDeck.save();
        res.json(createDeck);
    } catch (error) {
        console.error("Error creating deck:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
// Define a GET route to retrieve all decks
app.get("/decks", async (req: Request, res: Response) => {
    try {
        const decks = await Deck.find();
        res.status(200).json(decks);
    } catch (error) {
        console.error("Error fetching decks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Define a GET route for testing
app.get("/hello", (req: Request, res: Response) => {
    res.send("hello world");
});
app.delete('/decks/:deckId',async (req: Request, res: Response) => {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);

    res.json({
        deck
    });
});
// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://flashcardsage:YCd3TXmDrIt7lQRe@cluster0.ko5cio7.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


