import { useState, useEffect } from "react";

// Simplified PlayerModal component inline since we can't import external components
const SimplePlayerModal = ({ isOpen, onClose, playerId }) => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && playerId) {
      setLoading(true);
      // Mock data instead of actual fetch
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

      // Simulate fetching data with a delay
      setTimeout(() => {
        setPlayerData(mockPlayerData);
        setLoading(false);
      }, 1000);
    }
  }, [isOpen, playerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
      <div className="mx-5 relative w-full max-w-sm rounded-lg shadow-xl">
        <div className="bg-white rounded-t-xl px-6 py-2 flex items-center justify-between border-b border-gray-200">
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#bf0000]"></div>
            </div>
          ) : playerData ? (
            <div className="space-y-1">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {playerData.name}
                </h2>
                <p className="text-[#bf0000] font-semibold">
                  {playerData.role}
                </p>
                <p className="text-[#bf0000] font-semibold">
                  {playerData.team}
                </p>
              </div>

              <hr className="my-4 border-[#bf0000] border-2" />

              {playerData.stats && (
                <>
                  <div className="grid grid-cols-2 gap-4 m-4 pt-5">
                    <div className="bg-gray-50 rounded-lg p-3 shadow">
                      <div className="text-sm text-gray-500">Matches</div>
                      <div className="text-xl font-bold">
                        {playerData.stats.matches}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 shadow">
                      <div className="text-sm text-gray-500">Runs</div>
                      <div className="text-xl font-bold">
                        {playerData.stats.runs}
                      </div>
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
                </>
              )}
            </div>
          ) : (
            <div className="text-center p-4">
              <p>No player data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ViewPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/players");
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json();
        setPlayers(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err);
        setError("Failed to fetch players. Please try again.");
        setLoading(false);
      }
    };

    // Call the actual fetch function instead of using mock data
    fetchPlayers();
  }, []);

  const openModal = (playerId) => {
    setSelectedPlayer(playerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(players.map((player) => player.category || "Uncategorized")),
  ];

  // Filter and sort players
  const filteredPlayers = players
    .filter((player) => {
      const matchesSearch = player.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || player.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name?.localeCompare(b.name);
      } else if (
        sortBy === "runs" &&
        a.totalRuns !== undefined &&
        b.totalRuns !== undefined
      ) {
        return b.totalRuns - a.totalRuns;
      } else if (
        sortBy === "wickets" &&
        a.wickets !== undefined &&
        b.wickets !== undefined
      ) {
        return b.wickets - a.wickets;
      }
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="bg-[#000000] text-[#ffffff] p-4 md:p-6 rounded-t-lg mb-6 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
          Players Data
        </h2>
        <p className="text-center text-gray-100 text-sm md:text-base">
          Browse and search through our collection of cricket talent
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Search icon */}
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-gray-50 border border-gray-300 text-[#000000] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#bf0000] focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            {/* Filter icon */}
            <svg
              className="w-5 h-5 text-[#bf0000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              ></path>
            </svg>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-[#000000] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#bf0000]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            {/* Sort icon */}
            <svg
              className="w-5 h-5 text-[#bf0000]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              ></path>
            </svg>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-[#000000] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#bf0000]"
            >
              <option value="name">Name</option>
              <option value="runs">Runs (High-Low)</option>
              <option value="wickets">Wickets (High-Low)</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Showing {filteredPlayers.length} of {players.length} players
          </span>
          {filterCategory !== "All" && (
            <button
              onClick={() => setFilterCategory("All")}
              className="text-[#bf0000] hover:underline text-sm font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#bf0000]"></div>
        </div>
      ) : error ? (
        /* Error State */
        <div className="p-6 bg-red-50 border-l-4 border-[#bf0000] text-[#bf0000] rounded-lg text-center shadow">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-[#bf0000] text-white px-4 py-2 rounded hover:bg-[#a00000] transition"
          >
            Retry
          </button>
        </div>
      ) : (
        /* Players Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div
                key={player._id || player.id}
                className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden"
                onClick={() => openModal(player._id || player.id)}
              >
                {/* Card Header with Category */}
                <div className="bg-[#000000] text-white p-3 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {player.category || "Player"}
                  </span>
                  {player.isSelected && (
                    <span className="bg-green-600 text-xs text-white px-2 py-1 rounded-full flex items-center">
                      {/* Trophy icon */}
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v2.5a2 2 0 01-2 2H15.5L14 15v3a2 2 0 01-2 2h-4a2 2 0 01-2-2v-3L4.5 10.5H3a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm7 2H8v1h4V5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Selected
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#bf0000] mb-2">
                    {player.name}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {player.university || "Unknown"}
                  </p>

                  {/* Stats Preview */}
                  <div className="grid grid-cols-2 gap-2 text-sm my-3">
                    {player.totalRuns !== undefined && (
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-700">
                          Runs:
                        </span>
                        <span className="text-black">{player.totalRuns}</span>
                      </div>
                    )}
                    {player.wickets !== undefined && (
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-700">
                          Wickets:
                        </span>
                        <span className="text-black">{player.wickets}</span>
                      </div>
                    )}
                    {player.inningsPlayed !== undefined && (
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-700">
                          Innings:
                        </span>
                        <span className="text-black">
                          {player.inningsPlayed}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-3 flex justify-end">
                    <button className="bg-[#bf0000] text-white text-sm px-3 py-1 rounded hover:bg-[#a00000] transition flex items-center">
                      View Profile
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Search Results */
            <div className="col-span-full text-center p-12 bg-white rounded-lg shadow">
              <p className="text-gray-600 mb-4">
                No players found matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("All");
                }}
                className="bg-[#bf0000] text-white px-4 py-2 rounded hover:bg-[#a00000] transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty Database State */}
      {!loading && !error && players.length === 0 && (
        <div className="text-center p-12 bg-white rounded-lg shadow-md">
          <div className="text-gray-400 text-6xl mb-4">🏏</div>
          <h3 className="text-lg font-medium text-[#000000] mb-2">
            No Players Available
          </h3>
          <p className="text-gray-600 mb-4">
            There are currently no players in the database.
          </p>
        </div>
      )}

      {/* Simplified Player Modal */}
      <SimplePlayerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        playerId={selectedPlayer}
      />
    </div>
  );
};

export default ViewPlayers;
