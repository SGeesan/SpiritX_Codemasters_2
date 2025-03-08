import React from 'react';
import { api } from '../api/api';
import Swal from 'sweetalert2';

function TeamSelectCard({ player, teamId }) {
  const calculateValue = (player) => {
    let battingSR = (player.totalRuns / player.ballsFaced) * 100;
    let bowlingSR = (player.oversBowled * 6) / player.wickets;
    let battingAVG = player.totalRuns / player.inningsPlayed;
    let economyRate = player.runsConceded / player.oversBowled;

    let points =
      battingSR / 5 +
      battingAVG * 0.8 +
      500 / bowlingSR +
      140 / economyRate;
    let value = (9 * points + 100) * 1000;
    return value.toFixed(2);
  };


  const handleBuyPlayer = () => {
    api
      .post("/teams/addAPlayer", { player, teamId })
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Player Added',
          text: 'Player added to your team',
        });
      })
      .catch((error) =>
       Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: error.response.data.message,
      }));
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105">
      <div className="flex flex-col items-center pb-10 pt-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
          alt={player.name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {player.name}
        </h5>
        {/* Ensuring exactly 2 lines for university name */}
        <span className="text-sm text-gray-500 text-center w-4/5 h-10 flex items-center justify-center overflow-hidden text-ellipsis whitespace-pre-line">
          {player.university}
        </span>
        <span className="text-sm text-gray-500 font-bold">Rs: {calculateValue(player)}</span>
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handleBuyPlayer}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#bf0000] rounded-lg hover:bg-[#e30220] focus:outline-none transition-all duration-500"
          >
            Buy This Player
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamSelectCard;
