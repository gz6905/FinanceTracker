const xlsx = require("xlsx");
const Expense = require("../models/Expense");

// Add expense source
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Server Error. Unable to add expense" });
  }
};

// Get all expense source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error. Failed to get all expense" });
  }
};

// Delete expense source
exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: userId,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error. Failed to delete expense" });
  }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error. Failed to download expense as Excel" });
  }
};
