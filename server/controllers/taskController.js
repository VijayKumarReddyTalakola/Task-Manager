import mongoose from "mongoose";
import Task from "../models/taskModel.js";

// get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.find({ userId })
      .select("-userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Tasks Data Sent", tasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get a single task
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such task found" });
    }
    const task = await Task.findById(id).select("-userId");
    if (!task) {
      return res.status(404).json({ error: "No such task found" });
    }
    return res.status(200).json({ message: "Task Details", task });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create a new task
export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
    const userId = req.userId;
    req.body.userId = userId;
    const task = await Task.create(req.body);
    const allTasks = await Task.find({ userId })
      .select("-userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Task Added", allTasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such task found" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "No such task found" });
    }
    const response = await Task.findByIdAndDelete(id);
    const allTasks = await Task.find({ userId: req.userId })
      .select("-userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Task Deleted", allTasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such task found" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "No such task found" });
    }
    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    const allTasks = await Task.find({ userId: req.userId })
      .select("-userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Task Updated", allTasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getFilteredTasks = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Please provide both dates" });
    }
    const tasks = await Task.find({
      userId: req.userId,
      dueDate: { $gte: startDate, $lte: endDate },
    })
      .select("-userId")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Requested Expenses", tasks });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
