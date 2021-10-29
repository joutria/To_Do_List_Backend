const fs = require("fs/promises");
const path = require("path");

async function writeFile(tasks) {
  const TODOLIST_PATH = path.resolve(__dirname, "../../", "toDoList.json");
  try {
    fs.writeFile(TODOLIST_PATH, JSON.stringify(tasks));
  } catch (error) {
    throw error;
  }
}

async function getTasks() {
  const TODOLIST_PATH = path.resolve(__dirname, "../../", "toDoList.json");
  try {
    const tasks = await fs.readFile(TODOLIST_PATH, "utf8");
    return JSON.parse(tasks);
  } catch (error) {
    throw error;
  }
}

async function getTaskById(identifier) {
  const TODOLIST_PATH = path.resolve(__dirname, "../../", "toDoList.json");
  try {
    const tasks = await getTasks();
    const result = tasks.find((x) => x.id == identifier) || {};
    return result;
  } catch (error) {
    throw error;
  }
}

async function postTask(newTaskInfo) {
  try {
    const tasks = await getTasks();
    const nextId = tasks.length + 1;
    const newTaskObj = { id: nextId, ...newTaskInfo };
    tasks.push(newTaskObj);
    writeFile(tasks);
    return tasks;
  } catch (error) {
    throw error;
  }
}

async function putTask(id, newTask){}

async function deleteTask(id){}

module.exports = { getTasks, getTaskById, postTask, putTask, deleteTask};
