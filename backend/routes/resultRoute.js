import express from "express";
import { Result } from "../models/score.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      req.body.player1name === undefined ||
      req.body.player2name === undefined ||
      req.body.player1score < 0 ||
      req.body.player2score < 0 ||
      req.body.whoWon === undefined
    ) {
      return res.status(400).send({
        message: "Send all required fields: name, score, who won",
      });
    }
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    const newResult = {
      email: req.body.email,
      player1name: req.body.player1name,
      player2name: req.body.player2name,
      player1score: req.body.player1score,
      player2score: req.body.player2score,
      whoWon: req.body.whoWon,
      date: date,
      time: time,
    };

    const result = await Result.create(newResult);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const query = { email: userEmail };
    const results = await Result.find(query);
    return res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
