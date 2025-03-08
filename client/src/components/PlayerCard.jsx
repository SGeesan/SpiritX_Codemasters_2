import React, {useState} from 'react'
import PlayerStatModal from './PlayerStatModal'

function PlayerCard({player}) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <div>
      {isModalOpen && <PlayerStatModal player={player} isOpen={openModal} onClose={closeModal}  />}
    </div>
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  transition-transform hover:scale-105">
    <div className="flex justify-end px-4 pt-4">
      
    </div>
    <div className="flex flex-col items-center pb-10">
      <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=" alt={player.name} />
      <h5 className="mb-1 text-xl font-medium text-gray-900">{player.name}</h5>
      <span className="text-md text-gray-500">{player.category}</span>
      <div className="flex mt-4 md:mt-6">
        <button onClick={openModal}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#bf0000] rounded-lg hover:bg-[#e30220] focus:outline-none transition-all duration-500">View Details</button>
        
      </div>
    </div>
  </div>
  </>
  )
}

export default PlayerCard