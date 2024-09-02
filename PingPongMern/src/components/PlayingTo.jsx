import { useEffect, useRef, useState } from "react";
export default function PlayingTo({ onChangeValue, resetCounter }) {
  const number = useRef();
  const [value, setValue] = useState(11);

  useEffect(() => {
    setValue(11);
    if (number.current) {
      number.current.value = 11;
    }
    onChangeValue(11);
  }, [resetCounter]);

  function handleChange(e) {
    const newValue = Math.min(100, Math.max(0, parseInt(e.target.value, 10)));
    setValue(newValue);
    onChangeValue(newValue);
  }

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="text-center">
        <label
          htmlFor="playingTo"
          className="py-2 px-4 mr-2 mb-2 bg-blue-500 text-white font-semibold rounded-lg"
        >
          Playing To:
        </label>
        <input
          onChange={handleChange}
          ref={number}
          type="number"
          className="bg-gray-200 w-auto h-auto text-center border text-black border-gray-600 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          value={value}
          min="0"
          max="100"
        />
      </div>
    </div>
  );
}
