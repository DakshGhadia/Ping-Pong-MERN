import { useState } from "react";
export default function CustomizationModal({ 
    playingTo,
    onPress, 
    isWinBy2, 
    setWinBy2, 
    serviceChangeValue, 
    setServiceChangeValue}) {


  function onChangeValue(e) {
    setServiceChangeValue(Math.max(1,Number(e.target.value)));
  }

  function handleCheckboxChange(event) {
    const checked = event.target.checked;
    setWinBy2(checked);
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-auto p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-center text-lg font-semibold">Customize</p>
          <div className="flex justify-center items-center gap-x-4 w-auto">
            <input
              type="checkbox"
              checked={isWinBy2}
              onChange={handleCheckboxChange}
            />
            <label
              className="px-2 py-1 bg-blue-500 text-white font-semibold rounded-lg ">
              Win by 2
            </label>
          </div>

          <div className="flex justify-center items-center mt-5">
          <label
              className="px-2 py-1 mr-2 h-auto bg-blue-500 text-white font-semibold rounded-lg ">
              Switch Serves
            </label>

            <input
              type="number"
              className="bg-gray-200 w-auto text-center border text-black border-gray-600 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              min={1}
              max={Number(playingTo)-1}
              value={serviceChangeValue}
              onChange={onChangeValue}
            />
          </div>

          <div className="flex w-auto justify-center ">
            <button
              onClick={onPress}
              className="py-2 px-2 mt-5 bg-gray-400 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
