import React, { useState } from "react";
import PlayerModal from "./PlayerModal"; 

const TestPlayerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playerId, setPlayerId] = useState(1); // You can change the player ID for testing

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="text-center">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Show Player Info
        </button>
      </div>

      {/* PlayerModal component */}
      <PlayerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        playerId={playerId}
      />
    </div>
  );
};

export default TestPlayerModal;
