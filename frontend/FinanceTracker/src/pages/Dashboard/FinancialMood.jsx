import React from "react";

const getMood = (income, expense) => {
  if (income === 0 && expense === 0) {
    return { emoji: "🤔", message: "No activity this week." };
  }
  if (income === 0) {
    return {
      emoji: "😟",
      message: "No income this week. Watch your spending!",
    };
  }
  const savingsRate = (income - expense) / income;
  if (savingsRate >= 0.3)
    return { emoji: "😃", message: "You’re saving a lot this week!" };
  if (savingsRate >= 0.1)
    return { emoji: "🙂", message: "You’re saving steadily." };
  if (savingsRate >= 0)
    return { emoji: "😬", message: "You’re just breaking even." };
  return { emoji: "😟", message: "You’re spending more than you earn!" };
};

const FinancialMood = ({ recentIncome = 0, recentExpense = 0 }) => {
  const { emoji, message } = getMood(recentIncome, recentExpense);

  return (
    <div className="card flex flex-col gap-2 mb-6 mt-6">
      {/* Weekly indicator */}
      <div className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wide mb-1">
        Last 7 Days Summary
      </div>
      <div className="flex items-center gap-4">
        <span className="text-3xl">{emoji}</span>
        <span className="text-base font-medium">{message}</span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Income:{" "}
        <span className="font-semibold text-green-600 dark:text-green-400">
          ${recentIncome}
        </span>{" "}
        &nbsp;|&nbsp; Expenses:{" "}
        <span className="font-semibold text-red-500 dark:text-red-400">
          ${recentExpense}
        </span>
      </div>
      <div className="text-xs text-gray-400">
        Net:{" "}
        <span
          className={
            recentIncome - recentExpense >= 0
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }
        >
          ${recentIncome - recentExpense}
        </span>
      </div>
    </div>
  );
};

export default FinancialMood;
