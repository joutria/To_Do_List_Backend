const fs = require("fs/promises");
const path = require("path");

const TODOLIST_PATH = path.resolve("toDoList.json");

const getTasks = async () => {
  // Get all tasks
  try {
    const tasks = await fs.readFile(TODOLIST_PATH, "utf8");
    return JSON.parse(tasks);
  } catch (error) {
    console.log(error);
  }
};

const addTask = async(taskObj) => {
  // Add a task to the list of tasks
  try{
    const tasks = await getTasks(); //Obtenemos todas las tareas
    tasks.push(taskObj); //Agregamos la tarea a la lista
    await fs.writeFile(TODOLIST_PATH, JSON.stringify(tasks));
    return taskObj; //Regresamos el objeto tarea que agregamos
  }catch(error){
    console.log(error);
  }

};

const removeTask = () => {
  // Remove a task from the list of tasks
};

const updateTask = () => {
  // Update a task in the list of tasks
};

const createTaskObj = (uriEncoded) => {
  let bodyArr = decodeURIComponent(uriEncoded).split("&"); //Creamos un arreglo donde cada elemento sea [llave=valor]
  let dataObj = {}; //Objeto donde guardaremos la [llave=valor]
  bodyArr.map((e) => {
    const keyvalue = e.split('='); //Obtenemos un arreglo donde cada elemento va a ser [llave, valor]
    dataObj[keyvalue[0]] = keyvalue[1]; //la llave está en la posición 0 y el valor en la posición 1 del arreglo
  });
  return dataObj;
}


// CRUD operations

module.exports = {
  getTasks,
  addTask,
  removeTask,
  updateTask,
  createTaskObj
};
