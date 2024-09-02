import { useState, useEffect } from "react";
import PlayingToNotSetModal from "./PlayingToNotSetModal";
import WonModal from "./WonModal";
export default function PlayerContainer({
  resetCounter,
  opponentName,
  playingTo,
  wonReset,
  setPlayerName,
  winBy2,
  playerScore,
  increaseScore,
  decreaseScore,
  opponentScore,
  userEmail,
}) {
  const [showModal, setShowModal] = useState(false);
  const [won, setWon] = useState(false);
  const [name, setName] = useState();

  useEffect(() => {
    setWon(false);
  }, [resetCounter]);

  useEffect(() => {
    let winConditionMet = false;

    if (winBy2) {
      // Check if the player has won by 2 points
      if (
        Number(playerScore) !== 0 &&
        Number(playerScore) >= Number(playingTo) &&
        Number(playerScore) - Number(opponentScore) >= 2
      ) {
        winConditionMet = true;
      }
    } else {
      // Standard win condition
      if (
        Number(playerScore) === Number(playingTo) &&
        Number(playerScore) !== 0
      ) {
        winConditionMet = true;
      }
    }

    if (winConditionMet) {
      sendData();
      setWon(true);
    }
  }, [playerScore, playingTo, opponentScore, winBy2]);

  function toggleModal() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  function handleChangeName(event) {
    setName(event.target.value);
    setPlayerName(event.target.value);
  }

  async function sendData() {
    console.log("Got called");
    const data = {
      email: userEmail,
      player1name: name,
      player2name: opponentName,
      player1score: playerScore,
      player2score: opponentScore,
      whoWon: name,
    };
    try {
      const response = await fetch("http://localhost:3000/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="h-auto w-auto bg-amber-200 rounded-md flex flex-col items-center">
      <input
        type="text"
        value={name}
        className="bg-transparent border-none w-full text-center mt-4 placeholder-black placeholder-opacity-100 focus:placeholder-opacity-0 "
        placeholder="Enter your name here"
        onChange={handleChangeName}
      />
      <button
        className="w-2/3 h-3/4 mt-6 bg-white flex rounded-xl justify-center items-center text-8xl font-bold"
        onClick={() =>
          playingTo == 0 || isNaN(playingTo) ? toggleModal() : increaseScore()
        }
      >
        {playerScore}
      </button>
      <div>
        <button
          onClick={decreaseScore}
          className="mt-3 bg-blue-500 rounded-lg mb-2"
        >
          <p className="text-3xl">↓</p>
        </button>
      </div>
      {showModal && <PlayingToNotSetModal onPress={handleClose} />}
      {won && <WonModal onPressed={wonReset} playerWon={name} />}
    </div>
  );
}
