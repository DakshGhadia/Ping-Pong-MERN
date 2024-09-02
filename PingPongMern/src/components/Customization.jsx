import CustomizationModal from "./CustomizationModal";
import NameNotSetModal from "./NameNotSetModal";
import { useState, useEffect } from "react";

export default function Customization({
  playingTo,
  player1Name,
  player2Name,
  setWinBy2,
  setServiceChange,
}) {
  const [showModal, setShowModal] = useState(false);
  const [playerAvailable, setPlayerAvailable] = useState(false);
  const [isWinBy2, setIsWinBy2] = useState(true);
  const [serviceChangeValue, setServiceChangeValue] = useState(2);

  useEffect(() => {
    if (player1Name.trim() != "" && player2Name.trim() != "") {
      setPlayerAvailable(true);
    } else {
      setPlayerAvailable(false);
    }
  }, [player1Name, player2Name]);

  function toggleModal() {
    setShowModal((modal) => !modal);
  }

  function handleWinBy2Change(checked) {
    setIsWinBy2(checked);
    setWinBy2(checked);
  }

  function handleServiceChangeValue(value) {
    setServiceChangeValue(value);
    setServiceChange(value);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={toggleModal}
        className="mt-2 py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Customization
      </button>
      {showModal && !playerAvailable && (
        <NameNotSetModal onPress={toggleModal} />
      )}
      {showModal && playerAvailable && (
        <CustomizationModal
          playingTo={playingTo}
          isWinBy2={isWinBy2}
          setWinBy2={handleWinBy2Change}
          serviceChangeValue={serviceChangeValue}
          setServiceChangeValue={handleServiceChangeValue}
          onPress={toggleModal}
        />
      )}
    </div>
  );
}
