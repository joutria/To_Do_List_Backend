const {
  getTasks,
  getTaskById,
  postTask,
  putTask,
  deleteTask,
} = require("../services/tasks.services");

const getTasksCtrl = async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const getTaskByIdCtrl = async (req, res, next) => {
  const identifier = Number(req.params.id);
  try {
    const taskById = await getTaskById(identifier);
    res.json(taskById);
  } catch (error) {
    next(error);
  }
};

const postTaskCtrl = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const newTask = { title, description};
    const response = await postTask(newTask);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const putTaskCtrl = async (req, res, next) => {};

const deleteTaskCtrl = async (req, res, next) => {};

module.exports = {
  getTasksCtrl,
  getTaskByIdCtrl,
  postTaskCtrl,
  putTaskCtrl,
  deleteTaskCtrl,
};
