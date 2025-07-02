import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'flowbite-react'; // Assuming you're using Flowbite like in previous example

const UpdatePlayerModal = ({ isOpen, onClose, player }) => {
  const [updatedPlayer, setUpdatedPlayer] = useState({
    name: '',
    university: '',
    category: 'Batsman',
    totalRuns: 0,
    ballsFaced: 0,
    wickets: 0,
    inningsPlayed: 0,
    oversBowled: 0,
    runsConceded: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Categories for the dropdown
  const categories = ['Batsman', 'Bowler', 'All-Rounder'];

  // Fetch player data when modal opens or playerId changes
  const playerId = player._id;
  useEffect(() => {
    if (isOpen && playerId) {
      fetchPlayerData();
    }
  }, [isOpen, playerId]);

  // Function to fetch player data by ID
  const fetchPlayerData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:5000/players/${playerId}`);
      const playerData = response.data;
      
      setUpdatedPlayer(playerData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching player data:', err);
      setError('Failed to load player data. Please try again.');
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers
    const numericFields = ['totalRuns', 'ballsFaced', 'wickets', 'inningsPlayed', 'oversBowled', 'runsConceded'];
    
    setUpdatedPlayer({
      ...updatedPlayer,
      [name]: numericFields.includes(name) ? Number(value) : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setError(null);
    
    try {
      const response = await axios.post(`http://localhost:5000/players/${playerId}`, {updatedPlayer});
      const updatedPlayer = response.data;
      
      setUpdatedPlayer(updatedPlayer);
      setSuccessMessage('Player details updated successfully!');
      setLoading(false);
      
      // Close modal after successful update (with delay to show success message)
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error updating player data:', err);
      setError('Failed to update player data. Please try again.');
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setError(null);
    setSuccessMessage('');
    onClose();
  };

  return (
    <Modal show={isOpen} onClose={handleCloseModal} size="4xl">
      <Modal.Header className="bg-[#BF0000] text-white">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">Update Player Details</h3>
          <p className="text-sm opacity-80">Player ID: {playerId}</p>
        </div>
      </Modal.Header>
      
      <Modal.Body className="bg-white p-4 max-h-[70vh] overflow-y-auto">
        {loading && !updatedPlayer.name ? (
          <div className="p-4 text-center">Loading player data...</div>
        ) : error && !updatedPlayer.name ? (
          <div className="p-4 text-red-600 text-center">{error}</div>
        ) : (
          <>
            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                {successMessage}
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={updatedPlayer.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* University */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="university" className="block text-sm font-medium text-black mb-1">
                    University
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={updatedPlayer.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Category */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium text-black mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={updatedPlayer.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Total Runs */}
                <div>
                  <label htmlFor="totalRuns" className="block text-sm font-medium text-black mb-1">
                    Total Runs
                  </label>
                  <input
                    type="number"
                    id="totalRuns"
                    name="totalRuns"
                    value={updatedPlayer.totalRuns}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Balls Faced */}
                <div>
                  <label htmlFor="ballsFaced" className="block text-sm font-medium text-black mb-1">
                    Balls Faced
                  </label>
                  <input
                    type="number"
                    id="ballsFaced"
                    name="ballsFaced"
                    value={updatedPlayer.ballsFaced}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Wickets */}
                <div>
                  <label htmlFor="wickets" className="block text-sm font-medium text-black mb-1">
                    Wickets
                  </label>
                  <input
                    type="number"
                    id="wickets"
                    name="wickets"
                    value={updatedPlayer.wickets}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Innings Played */}
                <div>
                  <label htmlFor="inningsPlayed" className="block text-sm font-medium text-black mb-1">
                    Innings Played
                  </label>
                  <input
                    type="number"
                    id="inningsPlayed"
                    name="inningsPlayed"
                    value={updatedPlayer.inningsPlayed}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Overs Bowled */}
                <div>
                  <label htmlFor="oversBowled" className="block text-sm font-medium text-black mb-1">
                    Overs Bowled
                  </label>
                  <input
                    type="number"
                    id="oversBowled"
                    name="oversBowled"
                    value={updatedPlayer.oversBowled}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
                
                {/* Runs Conceeded */}
                <div>
                  <label htmlFor="runsConceded" className="block text-sm font-medium text-black mb-1">
                    Runs Conceeded
                  </label>
                  <input
                    type="number"
                    id="runsConceded"
                    name="runsConceded"
                    value={updatedPlayer.runsConceded}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
              
              {/* Stats Summary */}
              <div className="mt-6 bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-black mb-2">Player Statistics Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-black-800 font-semibold">Batting Average</span>
                    <p className="font-medium">
                      {updatedPlayer.inningsPlayed > 0 ? (updatedPlayer.totalRuns / updatedPlayer.inningsPlayed).toFixed(2) : 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-black font-semibold">Strike Rate</span>
                    <p className="font-medium">
                      {updatedPlayer.ballsFaced > 0 ? ((updatedPlayer.totalRuns / updatedPlayer.ballsFaced) * 100).toFixed(2) : 0}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-black font-semibold">Bowling Economy</span>
                    <p className="font-medium">
                      {updatedPlayer.oversBowled > 0 ? (updatedPlayer.runsConceded / updatedPlayer.oversBowled).toFixed(2) : 0}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </Modal.Body>
      
      <Modal.Footer className="flex justify-end gap-4">
        <Button
          color="light"
          onClick={handleCloseModal}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          color="failure"
          onClick={handleSubmit}
          disabled={loading || !updatedPlayer.name}
        >
          {loading ? 'Updating...' : 'Update Player'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Example of how to use this modal in a parent component:
const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  
  const openUpdateModal = (id) => {
    setSelectedPlayerId(id);
    setIsModalOpen(true);
  };
  
  return (
    <div>
      {/* Example button that opens the modal */}
      <Button onClick={() => openUpdateModal('123')} className="bg-[#BF0000]">
        Edit Player
      </Button>
      
      <UpdatePlayerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        playerId={selectedPlayerId} 
      />
    </div>
  );
};

export default UpdatePlayerModal;