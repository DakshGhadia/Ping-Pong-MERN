import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  player1name: {
    type: String,
    required: true,
  },

  player2name: {
    type: String,
    required: true,
  },

  player1score: {
    type: Number,
    required: true,
  },
  player2score: {
    type: Number,
    required: true,
  },
  whoWon: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export const Result = mongoose.model("Result", resultSchema);
