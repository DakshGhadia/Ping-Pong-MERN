export default function PlayingToNotSetModal({onPress}) {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="mb-4 text-center text-lg font-semibold">
            Please specify the score that you are playing to
          </p>
          <div className="flex justify-center gap-x-4">
            <button
              onClick={onPress}
              className="py-2 px-4 bg-gray-400 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
