import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need to install axios if not already installed

const PlayerUpdateForm = ({ playerId }) => {
  const [player, setPlayer] = useState({
    name: '',
    university: '',
    category: 'Batsman',
    totalRuns: 0,
    ballsFaced: 0,
    wickets: 0,
    inningsPlayed: 0,
    oversBowled: 0,
    runsConceeded: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Categories for the dropdown
  const categories = ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];

  // Fetch player data on component mount or when playerId changes
  useEffect(() => {
    fetchPlayerData();
  }, [playerId]);

  // Function to fetch player data by ID
  const fetchPlayerData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // DUMMY API CALL - Replace with your actual API endpoint
      // const response = await axios.get(`https://your-api-url/players/${playerId}`);
      // const playerData = response.data;
      
      // DUMMY DATA for development - REMOVE THIS WHEN CONNECTING REAL API
      const dummyApiCall = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              id: playerId,
              name: 'John Smith',
              university: 'Stanford University',
              category: 'Batsman',
              totalRuns: 1250,
              ballsFaced: 1500,
              wickets: 10,
              inningsPlayed: 25,
              oversBowled: 50,
              runsConceeded: 300
            });
          }, 500); // Simulate network delay
        });
      };
      
      const playerData = await dummyApiCall();
      
      setPlayer(playerData);
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
    const numericFields = ['totalRuns', 'ballsFaced', 'wickets', 'inningsPlayed', 'oversBowled', 'runsConceeded'];
    
    setPlayer({
      ...player,
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
      // DUMMY API CALL - Replace with your actual API endpoint
      // const response = await axios.put(`https://your-api-url/players/${playerId}`, player);
      // const updatedPlayer = response.data;
      
      // DUMMY UPDATE for development - REMOVE THIS WHEN CONNECTING REAL API
      const dummyUpdateCall = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('Updated player data:', player);
            resolve({ ...player, id: playerId });
          }, 500); // Simulate network delay
        });
      };
      
      const updatedPlayer = await dummyUpdateCall();
      
      setPlayer(updatedPlayer);
      setSuccessMessage('Player details updated successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error updating player data:', err);
      setError('Failed to update player data. Please try again.');
      setLoading(false);
    }
  };

  if (loading && !player.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 bg-white rounded shadow">Loading player data...</div>
      </div>
    );
  }

  if (error && !player.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 bg-white rounded shadow text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-8 px-4 bg-cover bg-center bg-fixed" 
      style={{ backgroundImage: "url(./spirit.jpg)" }}
    >
      <div className="max-w-3xl mx-auto rounded-lg shadow-md overflow-hidden bg-white bg-opacity-60 backdrop-blur-sm">
        <div className="bg-[#BF0000] bg-opacity-90 p-4 text-white">
          <h1 className="text-2xl font-bold">Update Player Details</h1>
          <p className="text-sm opacity-80">Player ID: {playerId}</p>
        </div>
        
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
        
        <form onSubmit={handleSubmit} className="p-6">
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
                value={player.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.university}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.totalRuns}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.ballsFaced}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.wickets}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.inningsPlayed}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
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
                value={player.oversBowled}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                required
                disabled={loading}
              />
            </div>
            
            {/* Runs Conceeded */}
            <div>
              <label htmlFor="runsConceeded" className="block text-sm font-medium text-black mb-1">
                Runs Conceeded
              </label>
              <input
                type="number"
                id="runsConceeded"
                name="runsConceeded"
                value={player.runsConceeded}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          {/* Stats Summary */}
          <div className="mt-6 bg-white bg-opacity-60 p-4 rounded-md">
            <h3 className="font-bold text-black mb-2">Player Statistics Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-black-800 font-semibold">Batting Average</span>
                <p className="font-medium">
                  {player.inningsPlayed > 0 ? (player.totalRuns / player.inningsPlayed).toFixed(2) : 0}
                </p>
              </div>
              <div>
                <span className="text-sm text-black font-semibold">Strike Rate</span>
                <p className="font-medium">
                  {player.ballsFaced > 0 ? ((player.totalRuns / player.ballsFaced) * 100).toFixed(2) : 0}
                </p>
              </div>
              <div>
                <span className="text-sm text-black font-semibold">Bowling Economy</span>
                <p className="font-medium">
                  {player.oversBowled > 0 ? (player.runsConceeded / player.oversBowled).toFixed(2) : 0}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()} // Or use your routing library to navigate back
              className="px-6 py-2 border border-gray-300 bg-white bg-opacity-70 rounded-md text-black font-semibold hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#BF0000] bg-opacity-90 text-white font-semibold rounded-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-[#BF0000]"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Player'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Here's how you would use this component in your application
// Example parent component:
/*
import { useParams } from 'react-router-dom';

const PlayerUpdatePage = () => {
  const { id } = useParams(); // Get the ID from the URL
  
  return (
    <div>
      <PlayerUpdateForm playerId={id} />
    </div>
  );
};
*/

export default PlayerUpdateForm;