import React from "react";


const PlayerStatModal = ({ isOpen, onClose, player }) => {
  
  if (!isOpen) return null;

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
                {player.name}
              </h2>
              <p className="text-[#bf0000] font-semibold">{player.category}</p>
              <p className="text-[#bf0000] font-semibold">{player.university}</p>
            </div>

            <hr className="my-4 border-[#bf0000] border-2 " />

            <div className="grid grid-cols-2 gap-4 m-4 pt-5">
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Innings</div>
                <div className="text-xl font-bold">
                  {player.inningsPlayed}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Runs</div>
                <div className="text-xl font-bold">{player.totalRuns}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Runs Conceded</div>
                <div className="text-xl font-bold">
                  {player.runsConceded}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 shadow">
                <div className="text-sm text-gray-500">Wickets</div>
                <div className="text-xl font-bold">
                  {player.wickets}
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
                    {player.oversBowled}
                  </div>
                  <div className="text-sm text-gray-500">Overs Bowled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#bf0000]">
                    {player.ballsFaced}
                  </div>
                  <div className="text-sm text-gray-500">Balls Faced</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#bf0000]">
                    {player.wickets}
                  </div>
                  <div className="text-sm text-gray-500">Wickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStatModal;