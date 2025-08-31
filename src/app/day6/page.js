"use client";
import { useState } from "react";
import DayPage from "@/components/DayPage";
import Iphone15Pro from "@/components/Iphone15pro";

export default function DayWisePage() {
  const emailCards = [
    { id: 1, subject: "Meeting Reminder", sender: "Aman Kumar", time: "10:30 AM" },
    { id: 2, subject: "Project Update", sender: "Riya Singh", time: "11:00 AM" },
    { id: 3, subject: "Lunch Invitation", sender: "Vikram Patel", time: "12:15 PM" },
    { id: 4, subject: "Weekly Report", sender: "Sneha Sharma", time: "2:00 PM" },
    { id: 5, subject: "Client Feedback", sender: "Rahul Verma", time: "3:30 PM" },
  ];

  const [selected, setSelected] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDelete = () => setShowOverlay(true);

  const confirmDelete = () => {
    setSelected([]);
    setShowOverlay(false);
  };

  return (
    <DayPage dayNumber={6} title="Wrap Overlay effect">
      <div className="flex justify-center">
       <Iphone15Pro>
  <div
    className="min-h-full max-w-xs mx-auto bg-gray-100 p-2 relative"
    style={{ height: "843.5px", overflow: "hidden", position: "relative" }}
  >
    <button
      disabled={selected.length === 0}
      onClick={handleDelete}
      className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded shadow transition-all z-20"
    >
      Delete
    </button>

    <div className="space-y-4 pt-8">
      {emailCards.map((email) => (
        <div
          key={email.id}
          className={`bg-white p-4 rounded-lg shadow-md flex flex-col border ${
            selected.includes(email.id) ? "border-red-400" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg text-gray-900 font-semibold">{email.subject}</h3>
            <input
              type="checkbox"
              checked={selected.includes(email.id)}
              onChange={() => toggleSelect(email.id)}
              className="mt-1"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>From: {email.sender}</span>
            <span>Time: {email.time}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Overlay inside phone screen */}
    <div
      className={`absolute inset-0 bg-red-400 bg-opacity-70 flex items-center justify-center z-30
        transition-opacity duration-300 ease-in-out
        ${showOverlay ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-72 text-center
          transform transition-transform duration-300 ease-in-out
          ${showOverlay ? "scale-100" : "scale-95"}
        `}
      >
        <h3 className="text-lg text-zinc-800 mb-2">Delete Emails?</h3>
        <p className="mb-4 text-zinc-800">Are you sure you want to delete the selected emails?</p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-700 px-4 py-2 rounded"
            onClick={() => setShowOverlay(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</Iphone15Pro>

      </div>
    </DayPage>
  );
}
