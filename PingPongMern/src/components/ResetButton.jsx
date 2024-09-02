import { useState } from "react";

export default function ResetButton({ onPressed }) {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal((modal) => !modal);
  }

  function handleYes() {
    onPressed();
    toggleModal();
  }

  function handleNo() {
    toggleModal();
  }

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={toggleModal}
        className="mt-5 py-2 px-4 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Reset
      </button>
      {modal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="mb-4 text-center text-lg font-semibold">
                Are you sure?
              </p>
              <div className="flex justify-end gap-x-4">
                <button
                  onClick={handleNo}
                  className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                >
                  No
                </button>
                <button
                  onClick={handleYes}
                  className="py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
