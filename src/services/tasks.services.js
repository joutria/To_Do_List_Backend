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

async function putTask(id, newTask){
  try {
    const tasks = await getTasks(); // Obtenemos todas las tareas

    // Buscamos la tarea que queremos actualizar
    const taskIndex = tasks.findIndex((e) => e.id === id);

    const updatedTask = {
      ...tasks[taskIndex],
      ...task,
    }; // [tarea actualizada] Objeto final con los datos actualizados de la tarea

    // Remplazar la tarea actualizada por la que se encuentra actualmente en el arreglo
    tasks[taskIndex] = updatedTask;
    await writeFile(tasks);
    return updatedTask;
  } catch (error) {
    throw error;
  }
}

async function deleteTask(id){
  try {
    const tasks = await getTasks();
    const taskIndex = tasks.findIndex((e) => e.id === id);
    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    return true;
  } catch (error) {
    throw error;
  }
}

module.exports = { getTasks, getTaskById, postTask, putTask, deleteTask};
