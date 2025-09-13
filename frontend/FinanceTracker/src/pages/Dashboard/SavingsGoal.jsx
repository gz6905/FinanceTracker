import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const SavingsGoal = ({ totalBalance }) => {
  const [goal, setGoal] = useState(1000);
  const [input, setInput] = useState(goal);

  useEffect(() => {
    // Fetch goal from backend
    axiosInstance.get(API_PATHS.DASHBOARD.GET_SAVINGS_GOAL).then((res) => {
      setGoal(res.data.savingsGoal || 1000);
      setInput(res.data.savingsGoal || 1000);
    });
  }, []);

  const handleSetGoal = async (e) => {
    e.preventDefault();
    const newGoal = Number(input) || 0;
    setGoal(newGoal);
    await axiosInstance.post(API_PATHS.DASHBOARD.SET_SAVINGS_GOAL, {
      savingsGoal: newGoal,
    });
  };

  const progress = Math.min((totalBalance / goal) * 100, 100);

  return (
    <div className="card mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Savings Goal</span>
        <form onSubmit={handleSetGoal}>
          <input
            type="number"
            min={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-box w-24 text-right pl-4"
          />
          <button type="submit" className="ml-2 btn-primary px-3 py-1 text-xs">
            Set
          </button>
        </form>
      </div>
      <div className="w-full dark:bg-gray-700 rounded-full h-4 mb-2 bg-gray-200">
        <div
          className="bg-primary h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>${totalBalance} saved</span>
        <span>${goal} goal</span>
      </div>
    </div>
  );
};

export default SavingsGoal;
