import { useState, useEffect } from "react";
import { api } from "../api/api";
import { FaUserCircle } from "react-icons/fa";

const PlayerModal = ({ isOpen, onClose, playerId }) => {
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (isOpen && playerId) {
      const mockPlayerData = {
        id: playerId,
        name: "Virat Kohli",
        role: "Batsman",
        team: "India",
        stats: {
          matches: 254,
          runs: 12169,
          average: 59.07,
          strikeRate: 93.17,
          hundreds: 43,
          fifties: 62,
          highestScore: 183,
        },
      };

      // Simulate fetching data by setting mock data after a delay
      setTimeout(() => {
        setPlayerData(mockPlayerData);
      }, 1000); // 1 second delay to simulate loading
    }
  }, [isOpen, playerId]);

  if (!isOpen || !playerData) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
      <div className="mx-5 relative w-full max-w-sm  rounded-lg shadow-xl">
        <div className="bg-white rounded-t-xl px-6 py-2 flex items-center justify-between border-b border-[#a9b9e3]">
          <h3 className="text-xl font-bold text-[#000000]">Player Profile</h3>
          <button
            type="button"
            className="text-gray-900 hover:bg-[#bf0000] rounded p-2 transition-colors"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="bg-white p-4 rounded-b-xl">
          <div className="space-y-1">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {playerData.name}
              </h2>
              <p className="text-[#bf0000] font-semibold">{playerData.role}</p>
              <p className="text-[#bf0000] font-semibold">{playerData.team}</p>
            </div>

            <hr className="my-4 border-[#bf0000] border-2 " />

            <div className="grid grid-cols-2 gap-4 m-4 pt-5">
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Matches</div>
                <div className="text-xl font-bold">
                  {playerData.stats.matches}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Runs</div>
                <div className="text-xl font-bold">{playerData.stats.runs}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Average</div>
                <div className="text-xl font-bold">
                  {playerData.stats.average}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Strike Rate</div>
                <div className="text-xl font-bold">
                  {playerData.stats.strikeRate}
                </div>
              </div>
            </div>

            {/* Achievements section */}
            <div className="bg-gray-50 rounded-lg p-4 shadow mb-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-2">
                Career Highlights
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#bf0000]">
                    {playerData.stats.hundreds}
                  </div>
                  <div className="text-sm text-gray-500">Hundreds</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#bf0000]">
                    {playerData.stats.fifties}
                  </div>
                  <div className="text-sm text-gray-500">Fifties</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#bf0000]">
                    {playerData.stats.highestScore}
                  </div>
                  <div className="text-sm text-gray-500">Highest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
