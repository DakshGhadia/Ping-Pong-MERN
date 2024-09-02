import { useState, useEffect } from "react";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

export default function Results() {
  const [result, setResult] = useState([]);
  const { userEmail } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3000/results?userEmail=${userEmail}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userEmail]);

  return (
    <>
      <Header />
      {result.map((item, index) => (
        <div key={index} className="p-6 max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex flex-col">
              <div className="flex border-b border-gray-300">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Player 1 Name
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {item.player1name}
                </div>
              </div>
              <div className="flex border-b border-gray-200">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Player 2 Name
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {item.player2name}
                </div>
              </div>
              <div className="flex border-b border-gray-200">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Player 1 Score
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {item.player1score}
                </div>
              </div>
              <div className="flex border-b border-gray-200">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Player 2 Score
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {item.player2score}
                </div>
              </div>
              <div className="flex border-b border-gray-200">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Who Won
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {item.whoWon}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3 py-3 px-4 font-semibold text-gray-600 bg-gray-100">
                  Time/Date
                </div>
                <div className="w-2/3 py-3 px-4 text-gray-900">
                  {`${item.time} / ${item.date}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
