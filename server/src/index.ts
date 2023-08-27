import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import Deck from "./models/Deck";

const PORT = 5000;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a POST route to create a new deck
app.post("/decks", async (req: Request, res: Response) => {
    try {
        const newDeck = new Deck({ title: 'my awesome flashcard deck' });
        const createDeck = await newDeck.save();
        res.status(201).json(newDeck);
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

// Connect to MongoDB and start the server
mongoose.connect("mongodb+srv://flashcardsage:okOtPs8t45GKm9Qo@cluster0.ko5cio7.mongodb.net/test").then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Assuming you have a model defined for "Deck" in a separate file
// models/Deck.js
// const mongoose = require("mongoose");
// const deckSchema = new mongoose.Schema({
//     title: String
// });
// const Deck = mongoose.model("Deck", deckSchema);
// module.exports = Deck;
