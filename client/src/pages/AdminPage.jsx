import React, { useEffect, useState } from "react";
import PlayerCardAdmin from "../components/Admin/PlayerCardAdmin";
import TeamSelectCard from "../components/TeamSelectCard";
import TeamPlayerCard from "../components/TeamPlayerCard";
import { api } from "../api/api";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CategorySelect from "../components/CategorySelect";
import UniversitySelect from "../components/UniversitySelect";
import Leaderboard from "../components/Leaderboard";
import axios from "axios";
import ChatButton from "../components/ChatModal";
import AddPlayer from "../components/Admin/AddPlayer";

function AdminPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

    

  const [activeTab, setActiveTab] = useState("profile");
  const [players, setPlayers] = useState([]);
  const [duplicatePlayers, setDuplicatePlayers] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All player Types");
  const [selectedUniversity, setSelectedUniversity] = useState("all");
  const [searchKey, setSearchKey] = useState("");

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const { teamId } = useParams();

  function applyFilters() {
    let filteredPlayers = duplicatePlayers;

    if (selectedCategory !== "All player Types") {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedUniversity !== "all") {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.university.toLowerCase() === selectedUniversity.toLowerCase()
      );
    }

    if (searchKey.trim()) {
      filteredPlayers = filteredPlayers.filter((player) =>
        player.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    setPlayers(filteredPlayers);
  }

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedUniversity, searchKey, duplicatePlayers]);

  useEffect(() => {
    api
      .get("/players/getAllPlayers")
      .then((response) => {
        setPlayers(response.data.players);
        setDuplicatePlayers(response.data.players);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("All done"));
  }, []);

  useEffect(() => {
    api
      .get("/users/getAllUsers")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("All done"));
  }, []);

  useEffect(() => {
    api
      .get("/teams/getAllTeams")
      .then((response) => {
        setTeams(response.data.teams);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("All done"));
  }, []);

  useEffect(() => {
    api
      .get(`/teams/getTeam/${teamId}`)
      .then((response) => {
        setTeamPlayers(response.data.team.players);
      })
      .catch((error) => console.log(error))
      .finally(() => console.log("All done"));
  }, [teamId]);

  const calculatePlayerPoint = (player) => {
    let battingSR = (player.totalRuns / player.ballsFaced) * 100;
    let bowlingSR = (player.oversBowled * 6) / player.wickets;
    let battingAVG = player.totalRuns / player.inningsPlayed;
    let economyRate = player.runsConceded / player.oversBowled;

    let points =
      battingSR / 5 + battingAVG * 0.8 + 500 / bowlingSR + 140 / economyRate;
    return points.toFixed(2);
  };

  const calculateTeamPoints = () => {
    let totalPoints = 0;
    teamPlayers.forEach((player) => {
      totalPoints += parseFloat(calculatePlayerPoint(player));
    });
    return totalPoints.toFixed(2);
  };

  const calculateValue = (player) => {
    let battingSR = (player.totalRuns / player.ballsFaced) * 100;
    let bowlingSR = (player.oversBowled * 6) / player.wickets;
    let battingAVG = player.totalRuns / player.inningsPlayed;
    let economyRate = player.runsConceded / player.oversBowled;

    let points =
      battingSR / 5 + battingAVG * 0.8 + 500 / bowlingSR + 140 / economyRate;
    let value = (9 * points + 100) * 1000;
    return value.toFixed(2);
  };

  const calculateExpenses = () => {
    let totalExpenses = 0;
    teamPlayers.forEach((player) => {
      totalExpenses += parseFloat(calculateValue(player));
    });
    return totalExpenses.toFixed(2);
  };

  const calculateBalance = () => {
    const expenses = calculateExpenses();
    const balance = 9000000 - expenses; // Initial budget of 90,000
    return balance.toFixed(2);
  };

  const tabs = [
    {
      id: "profile",
      label: "Players",
      icon: "user",
      content: players.map((player, index) => (
        <div key={index}>
          <PlayerCardAdmin player={player}></PlayerCardAdmin>
        </div>
      )),
    },
    {
      id: "dashboard",
      label: "Select Your Team",
      icon: "calendar",
      content: players.map((player, index) => (
        <div key={index}>
          <TeamSelectCard
            player={player}
            teamId={teamId}
            teamPlayers={teamPlayers}
            setActiveTab={setActiveTab}
          ></TeamSelectCard>
        </div>
      )),
    },
    {
      id: "settings",
      label: "Team",
      icon: "car",
      content: teamPlayers.map((teamPlayer, index) => (
        <div key={index}>
          <TeamPlayerCard
            player={teamPlayer}
            teamId={teamId}
            setTeamPlayers={setTeamPlayers}
          ></TeamPlayerCard>
        </div>
      )),
    },
    {
      id: "contacts",
      label: "Leaderboard",
      icon: "bookmark",
      content: "",
    },
  ];

  return (
    <div className="w-full mx-auto mt-5">
      <div>
      {isModalOpen && <AddPlayer isOpen={openModal} onClose={closeModal}  />}
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-200 mb-4 mx-10 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-2 mr-2 mb-2 rounded-t-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? "bg-red-100 text-red-800 border-b-2 border-red-600"
                : "text-gray-600 hover:text-red-600 hover:bg-red-50"
            }`}
            style={{
              borderColor: activeTab === tab.id ? "#BF0000" : "transparent",
              color: activeTab === tab.id ? "#BF0000" : "",
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {tab.icon === "user" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              )}

              {tab.icon === "calendar" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              )}

              {tab.icon === "car" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              )}

              {tab.icon === "bookmark" && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              )}
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white mx-10">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <div
                key={tab.id}
                className="prose max-w-none"
                style={{
                  color: "#1a1a1a",
                }}
              >
                <h2
                  className="text-xl font-medium mb-4"
                  style={{ color: "#BF0000" }}
                ></h2>

                <div className="flex flex-col items-center">
                {activeTab === "profile" &&  (
                    <button className="bg-[#bf0000] text-white text-center sm:text-lg text-sm rounded-lg shadow-lg font-semibold p-2 hover:bg-red-400 focus:outline-none transition-all duration-500" onClick={openModal}>
                      Add a Player
                    </button>
                  )}
                  {/* ----------------------------------------------------------------------- */}
                  {activeTab === "settings" && teamPlayers.length == 11 && (
                    <div className="bg-[#bf0000] text-white text-center w-1/2 sm:text-lg text-sm rounded-lg shadow-lg font-semibold p-4">
                      Congratulations! Your Team has {calculateTeamPoints()}{" "}
                      Points{" "}
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <div className="text-[#bf0000] bg-white text-center w-1/2 sm:text-lg text-sm rounded-lg shadow-lg font-semibold p-4 flex flex-row justify-between items-center">
                      <div>Expences: Rs. {calculateExpenses()} </div>
                      <div>Balance: Rs. {calculateBalance()}</div>
                    </div>
                  )}

                  {activeTab === "settings" && teamPlayers.length == 0 && (
                    <div className="bg-[#bf0000] text-white text-center w-1/2 sm:text-lg text-sm rounded-lg shadow-lg font-semibold p-4">
                      No Players Selected! Please Select Your Favourite Player
                      First
                    </div>
                  )}

                  {activeTab === "dashboard" && (
                    <div className="flex flex-col sm:flex-row max-w-6xl gap-2 sm:gap-10 mx-5 shadow-lg rounded-lg p-5 bg-white">
                      <CategorySelect filterByType={setSelectedCategory} />
                      <UniversitySelect
                        filterByDistrict={setSelectedUniversity}
                      />
                      <SearchBar setsearchKey={setSearchKey} />
                    </div>
                  )}
                  {activeTab === "contacts" && (
                    <div className="flex flex-col sm:flex-row max-w-6xl gap-2 sm:gap-10 mx-5 shadow-lg rounded-lg p-5 bg-white">
                      <div>
                        <Leaderboard
                          users={users}
                          teams={teams}
                          user={user}
                        ></Leaderboard>
                      </div>
                    </div>
                  )}

                {/* ----------------------------------------------------------------------- */}

                  <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-2 lg:gap-5 mx-10 sm:mx-10 mt-10">
                    {typeof tab.content === "string" ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: tab.content.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong style="color: #BF0000">$1</strong>'
                          ),
                        }}
                      />
                    ) : (
                      tab.content
                    )}
                  </div>

                  {activeTab === "settings" && teamPlayers.length > 0 && (
                    <div className="bg-[#bf0000] text-white text-center text-sm rounded-lg shadow-lg font-semibold p-4 mt-10 ">
                      {teamPlayers.length}/11 Player(s) Selected
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default AdminPage;
