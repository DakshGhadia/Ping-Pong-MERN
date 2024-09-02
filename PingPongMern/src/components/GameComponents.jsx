import PlayerContainer from "./PlayerContainer";
import { useState, useEffect } from "react";
import ResetButton from "./ResetButton";
import PlayingTo from "./PlayingTo";
import Customization from "./Customization";
import ServiceChangeModal from "./ServiceChangeModal";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GameComponents() {
  const [resetCounter, setResetCounter] = useState(0);
  const [playingTo, setPlayingTo] = useState(0);
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [winBy2, setWinBy2] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [serviceChange, setServiceChange] = useState(2);
  const [showServiceChangeModal, setShowServiceChangeModal] = useState(false);
  const [pointsSinceLastServiceChange, setPointsSinceLastServiceChange] =
    useState(0);
  const { userEmail } = useAuth();

  function handleReset() {
    setResetCounter((prev) => prev + 1);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPointsSinceLastServiceChange(0);
  }

  function changePlayingto(value) {
    setPlayingTo(value);
  }

  function increasePlayerScore(player) {
    if (player === 1) {
      setPlayer1Score((prev) => prev + 1);
    } else if (player === 2) {
      setPlayer2Score((prev) => prev + 1);
    }

    setPointsSinceLastServiceChange((prev) => prev + 1);
  }

  function decreasePlayerScore(player) {
    if (player === 1) {
      setPlayer1Score((prev) => Math.max(prev - 1, 0));
    } else if (player === 2) {
      setPlayer2Score((prev) => Math.max(prev - 1, 0));
    }
    setPointsSinceLastServiceChange((prev) => Math.max(prev - 1, 0));
  }

  useEffect(() => {
    if (winBy2 && serviceChange > 0 && playingTo > 0) {
      if (
        player1Score >= playingTo - 1 &&
        player2Score >= playingTo - 1 &&
        pointsSinceLastServiceChange == 1 &&
        Math.abs(player1Score - player2Score) < 2
      ) {
        setShowServiceChangeModal(true);
        setPointsSinceLastServiceChange(0);
      } else if (
        pointsSinceLastServiceChange >= serviceChange &&
        player1Score != playingTo &&
        player2Score != playingTo
      ) {
        setShowServiceChangeModal(true);
        setPointsSinceLastServiceChange(0);
      }
    } else if (
      pointsSinceLastServiceChange >= serviceChange &&
      player1Score != playingTo &&
      player2Score != playingTo &&
      serviceChange > 0 &&
      playingTo > 0
    ) {
      setShowServiceChangeModal(true);
      setPointsSinceLastServiceChange(0);
    }
  }, [
    pointsSinceLastServiceChange,
    serviceChange,
    player1Score,
    player2Score,
    playingTo,
    winBy2,
  ]);

  return (
    <>
      <Header />
      <div className="mt-5 w-full flex justify-center items-center">
        <Link to="/results">
          <button className="py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Results
          </button>
        </Link>
      </div>
      <PlayingTo resetCounter={resetCounter} onChangeValue={changePlayingto} />
      <div className="flex mt-5 justify-center items-center gap-x-10 lg:gap-x-36">
        <PlayerContainer
          winBy2={winBy2}
          playerScore={player1Score}
          opponentScore={player2Score}
          opponentName={player2Name}
          increaseScore={() => increasePlayerScore(1)}
          decreaseScore={() => decreasePlayerScore(1)}
          setPlayerName={setPlayer1Name}
          wonReset={handleReset}
          playingTo={playingTo}
          resetCounter={resetCounter}
          userEmail={userEmail}
        />

        <PlayerContainer
          winBy2={winBy2}
          playerScore={player2Score}
          opponentScore={player1Score}
          opponentName={player1Name}
          increaseScore={() => increasePlayerScore(2)}
          decreaseScore={() => decreasePlayerScore(2)}
          setPlayerName={setPlayer2Name}
          wonReset={handleReset}
          playingTo={playingTo}
          resetCounter={resetCounter}
          userEmail={userEmail}
        />
      </div>
      <ResetButton onPressed={handleReset} />
      <Customization
        playingTo={playingTo}
        setServiceChange={setServiceChange}
        setWinBy2={setWinBy2}
        player1Name={player1Name}
        player2Name={player2Name}
      />
      <ServiceChangeModal
        show={showServiceChangeModal}
        onPress={() => setShowServiceChangeModal(false)}
      />
    </>
  );
}
