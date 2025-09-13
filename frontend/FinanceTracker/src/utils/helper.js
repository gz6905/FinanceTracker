import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function getInitials(name = "") {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    // Return first two characters if only one word
    return words[0].substring(0, 2).toUpperCase();
  }
  // Otherwise, return first letter of first two words
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const addThousandsSeparator = (num) => {
  if (num === null || isNaN(num)) return "";
  const [integratePart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integratePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

// Had to fix because the chart displays the same item when the dates are the same.
export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const dateCount = {};

  const chartData = sortedData.map((item) => {
    const dateKey = moment(item.date).format("Do MMM");

    if (!dateCount[dateKey]) {
      dateCount[dateKey] = 0;
    }
    dateCount[dateKey]++;

    let displayMonth = dateKey;
    if (dateCount[dateKey] > 1) {
      displayMonth = dateKey + "\u200B".repeat(dateCount[dateKey] - 1);
    }

    return {
      month: displayMonth,
      amount: item.amount,
      category: item.category,
      originalDate: dateKey,
    };
  });

  return chartData;
};

// Had to fix because the chart displays the same item when the dates are the same.
export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Create unique labels for duplicate dates
  const dateCount = {};

  const chartData = sortedData.map((item, index) => {
    const dateKey = moment(item.date).format("Do MMM");

    // Count occurrences of each date
    if (!dateCount[dateKey]) {
      dateCount[dateKey] = 0;
    }
    dateCount[dateKey]++;

    // Create unique label by adding number suffix for duplicates
    let displayMonth = dateKey;
    if (dateCount[dateKey] > 1) {
      // Add invisible unicode character to make it unique but look the same
      displayMonth = dateKey + "\u200B".repeat(dateCount[dateKey] - 1);
    }

    return {
      month: displayMonth, // This is now unique for each bar
      amount: item.amount,
      category: item.source,
      originalDate: dateKey, // Keep original for display in tooltip
    };
  });

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Create unique labels for duplicate dates
  const dateCount = {};

  const chartData = sortedData.map((item, index) => {
    const dateKey = moment(item.date).format("Do MMM");

    // Count occurrences of each date
    if (!dateCount[dateKey]) {
      dateCount[dateKey] = 0;
    }
    dateCount[dateKey]++;

    // Create unique label by adding number suffix for duplicates
    let displayMonth = dateKey;
    if (dateCount[dateKey] > 1) {
      // Add invisible unicode character to make it unique but look the same
      displayMonth = dateKey + "\u200B".repeat(dateCount[dateKey] - 1);
    }

    return {
      month: displayMonth, // This is now unique for each point
      amount: item.amount,
      category: item.category || item.source, // Use category or source depending on your data structure
      originalDate: dateKey, // Keep original for display in tooltip
    };
  });

  return chartData;
};
