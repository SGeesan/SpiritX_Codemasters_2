import { useState } from "react";
import { Button, TextInput, Label, Checkbox } from "flowbite-react";

const AddPlayerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    category: "",
    totalRuns: 0,
    ballsFaced: 0,
    inningsPlayed: 0,
    wickets: 0,
    oversBowled: 0,
    runsConceded: 0,
    isSelected: false,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "error" or "success"

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add player");
      }

      setMessageType("success");
      setMessage("Player added successfully!");
      setFormData({
        name: "",
        university: "",
        category: "",
        totalRuns: 0,
        ballsFaced: 0,
        inningsPlayed: 0,
        wickets: 0,
        oversBowled: 0,
        runsConceded: 0,
        isSelected: false,
      });
    } catch (error) {
      setMessageType("error");
      setMessage("Error adding player: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8  bg-[#f5f5f5] shadow-lg rounded-xl border border-indigo-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#bf0000]">Add New Player</h2>
        <div className="p-2 bg-[#bf0000] text-white rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      <hr className="mb-6 border-[#000000] border-1" />
      {message && (
        <div
          className={`p-4 mb-6 rounded-lg ${
            messageType === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              value="Player Name"
              className="text-[#000000] font-medium"
            />
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="  Enter player's full name"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="university"
              value="University"
              className="text-[#000000] font-medium"
            />
            <TextInput
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="  Player's university"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category"
              value="Category"
              className="text-[#000000] font-medium"
            />
            <TextInput
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="  Batsman/Bowler/All-rounder"
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-[#bf0000] mb-4">
            Batting Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="totalRuns"
                value="Total Runs"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="totalRuns"
                name="totalRuns"
                type="number"
                value={formData.totalRuns}
                onChange={handleChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="ballsFaced"
                value="Balls Faced"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="ballsFaced"
                name="ballsFaced"
                type="number"
                value={formData.ballsFaced}
                onChange={handleChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="inningsPlayed"
                value="Innings Played"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="inningsPlayed"
                name="inningsPlayed"
                type="number"
                value={formData.inningsPlayed}
                onChange={handleChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#bf0000] mb-4">
            Bowling Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="wickets"
                value="Wickets"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="wickets"
                name="wickets"
                type="number"
                value={formData.wickets}
                onChange={handleChange}
                required
                className="focus:ring-[#000000] focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="oversBowled"
                value="Overs Bowled"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="oversBowled"
                name="oversBowled"
                type="number"
                value={formData.oversBowled}
                onChange={handleChange}
                required
                className="focus:ring-[#000000] focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="runsConceded"
                value="Runs Conceded"
                className="text-[#000000] font-medium"
              />
              <TextInput
                id="runsConceded"
                name="runsConceded"
                type="number"
                value={formData.runsConceded}
                onChange={handleChange}
                required
                className="focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 bg-[#cca3a3] p-4 rounded-lg">
          <Checkbox
            id="isSelected"
            name="isSelected"
            checked={formData.isSelected}
            onChange={handleChange}
            className="text-[#000000] focus:ring-indigo-500"
          />
          <Label htmlFor="isSelected" className="text-[#000000]] font-medium">
            Selected for Upcoming Match
          </Label>
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            color="success"
            className="w-full h-12 text-lg font-medium bg-[#000000] hover:bg-[#bf0000] border-none"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Player
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPlayerForm;
