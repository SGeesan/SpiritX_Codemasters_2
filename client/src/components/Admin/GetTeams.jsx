import React, { useState, useEffect } from "react";

const GetTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5000/teams");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Error fetching teams");
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleToggleDetails = (teamId) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Filter teams based on search term (team name)
  const filteredTeams = teams.filter(
    (team) =>
      searchTerm === "" ||
      team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-red-800 animate-pulse">
          Loading Teams...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-800 text-white p-6 rounded-lg shadow-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-red-800 text-center">
        Cricket Teams
      </h1>

      {/* Search Bar with Icon */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="Search teams by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 pl-10 pr-10 border-2 border-red-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
          />

          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Teams Display */}
      <div className="grid grid-cols-1 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team._id}
            className="border-2 border-red-800 rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="bg-red-800 p-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{team.name}</h2>
              <button
                onClick={() => handleToggleDetails(team._id)}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
              >
                {expandedTeamId === team._id ? "Hide Details" : "View Details"}
              </button>
            </div>

            {expandedTeamId === team._id && (
              <div className="p-4">
                <h3 className="text-xl font-bold mb-4 text-red-800">
                  Players:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {team.players.map((player, index) => (
                    <div
                      key={player._id || `player-${index}`}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-lg font-bold text-red-800 border-b border-red-800 pb-2 mb-2">
                        {player.name}
                      </h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-semibold">University:</span>{" "}
                          {player.university}
                        </p>
                        <p>
                          <span className="font-semibold">Category:</span>{" "}
                          {player.category}
                        </p>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="font-semibold text-black">
                            Batting Stats:
                          </p>
                          <div className="flex justify-between">
                            <p>Runs: {player.totalRuns}</p>
                            <p>Faced: {player.ballsFaced}</p>
                            <p>Inn: {player.inningsPlayed}</p>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="font-semibold text-black">
                            Bowling Stats:
                          </p>
                          <div className="flex justify-between">
                            <p>Wickets: {player.wickets}</p>
                            <p>Overs: {player.oversBowled}</p>
                            <p>Runs: {player.runsConceded}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTeams.length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg shadow border-2 border-red-800">
          <p className="text-xl font-semibold text-red-800">
            No teams match your search
          </p>
          <button
            onClick={handleClearSearch}
            className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default GetTeams;
