const xlsx = require("xlsx");
const Income = require("../models/Income");

// Add income source
exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: "Server Error. Unable to add income" });
  }
};

// Get all income source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error. Failed to get all income" });
  }
};

// Delete income source
exports.deleteIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: userId,
    });

    if (!income) {
      return res
        .status(404)
        .json({ message: "Income not found or unauthorized" });
    }

    return res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error. Failed to delete income" });
  }
};

// DOwnload Excel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_details.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error. Failed to download income as Excel" });
  }
};
