import { useState } from "react";
import { Button, Alert } from "flowbite-react";
import axios from "axios";

const DeletePlayerForm = () => {
  const [playerId, setPlayerId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleDelete = async () => {
    if (!playerId) {
      setError("Please enter a Player ID.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/players/${playerId}`
      );
      setMessage(response.data.message);
      setError("");
      setPlayerId("");
    } catch (err) {
      setError("Error deleting player. Please check the ID.");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-[#f5f5f5] rounded-lg shadow-xl ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#bf0000]">Delete Player</h2>
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>

      <hr className="mb-6 border-[#000000] border-1" />

      {message && (
        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <div className="flex">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <div>
              <p className="font-bold">Success!</p>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 border-l-4 border-[#bf0000] text-red-700 rounded">
          <div className="flex">
            <div className="py-1">
              <svg
                className="w-6 h-6 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label
          htmlFor="playerId"
          className="block text-[#000000] font-medium text-lg mb-2"
        >
          Player ID
        </label>
        <div
          className={`relative ${
            isFocused ? "transform -translate-y-1" : ""
          } transition-transform duration-200`}
        >
          <div
            className={`absolute inset-0 bg-[#bf0000] opacity-10 rounded-lg ${
              isFocused ? "shadow-lg" : ""
            }`}
          ></div>
          <div className="flex items-center relative bg-white rounded-lg border-2 border-[#dddddd] overflow-hidden hover:border-[#000000] ">
            <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 bg-[#000000]  text-white">
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
                  strokeWidth="2"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>
            </div>
            <input
              id="playerId"
              name="playerId"
              type="text"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Player ID"
              required
              className="w-full h-14 px-4 py-2 text-lg focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button
          color="failure"
          onClick={handleDelete}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Player
          </div>
        </Button>
      </div>

      <div className="mt-4 text-center text-sm text-[#666666]">
        <p>Note: This action cannot be undone</p>
      </div>
    </div>
  );
};

export default DeletePlayerForm;
