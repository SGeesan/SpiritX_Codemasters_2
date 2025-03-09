import React from "react";

function Leaderboard({ users, teams, user }) {
  // Calculate points for an individual player
  const calculatePlayerPoints = (player) => {
    // Handle edge cases to prevent division by zero
    const battingSR = player.ballsFaced > 0 ? (player.totalRuns / player.ballsFaced) * 100 : 0;
    const bowlingSR = player.wickets > 0 ? (player.oversBowled * 6) / player.wickets : 0;
    const battingAVG = player.inningsPlayed > 0 ? player.totalRuns / player.inningsPlayed : 0;
    const economyRate = player.oversBowled > 0 ? player.runsConceded / player.oversBowled : 0;
    
    // Calculate total points
    let points = 0;
    points += battingSR / 5;
    points += battingAVG * 0.8;
    points += bowlingSR > 0 ? 500 / bowlingSR : 0;
    points += economyRate > 0 ? 140 / economyRate : 0;
    
    return points.toFixed(2);
  };

  // Calculate total points for a team
  const calculateTeamPoints = (team) => {
    if (!team.players || team.players.length < 11) return "0.00";
    
    let totalPoints = 0;
    team.players.forEach((player) => {
      totalPoints += parseFloat(calculatePlayerPoints(player));
    });
    
    return totalPoints.toFixed(2);
  };

  // Find user for a specific team
  const getTeamOwner = (teamId) => {
    return users.find(user => user.teamId === teamId);
  };

  // Prepare teams with calculated points for sorting
  const teamsWithPoints = teams.map(team => ({
    ...team,
    pointsValue: parseFloat(calculateTeamPoints(team))
  }));

  // Sort teams by points (highest first)
  const sortedTeams = [...teamsWithPoints].sort((a, b) => b.pointsValue - a.pointsValue);

  // Create a map of user IDs to their team's rank (for showing in the user cards)
  const userTeamRanks = {};
  sortedTeams.forEach((team, index) => {
    if (team.userId) {
      userTeamRanks[team.userId] = index + 1;
    }
  });

  // Find the current user's team ID
  const currentUserTeamId = user ? user.teamId : null;

  return (
    <div className="p-4 bg-white text-black">
    <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: "#bf0000" }}>Spirit11 Leaderboard</h1>
    
    <div className="overflow-x-auto mb-8 shadow-md">
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ backgroundColor: "#bf0000" }}>
            <th className="p-3 text-left text-white font-semibold border border-gray-300">Rank</th>
            <th className="p-3 text-left text-white font-semibold border border-gray-300">Username</th>
            <th className="p-3 text-right text-white font-semibold border border-gray-300">Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => {
            const owner = getTeamOwner(team.id || team._id);
            // Check if this team belongs to the current user
            const isCurrentUserTeam = team.id === currentUserTeamId || team._id === currentUserTeamId;
            
            return (
              <tr 
                key={index} 
                className={`${isCurrentUserTeam ? "bg-red-200" : index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                style={{ 
                  borderLeft: "1px solid #e5e7eb",
                  borderRight: "1px solid #e5e7eb"
                }}
              >
                <td className="p-3 border-b border-gray-300 font-medium">
                  {index === 0 ? (
                    <div className="flex items-center">
                      <span className="mr-2">1</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#bf0000">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  ) : (
                    index + 1
                  )}
                </td>
                <td className="p-3 border-b border-gray-300">
                  {owner ? owner.username : "Unknown"}
                </td>
                <td className="p-3 border-b border-gray-300 font-semibold text-right">
                  {team.pointsValue.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
    <div className="text-center text-sm text-gray-500 mt-6">
      If you haven't 11 players in your team, your point is 0.
      Rankings updated in real-time based on player performance.
    </div>
  </div>
  );
}

export default Leaderboard;