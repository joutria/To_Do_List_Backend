const http = require("http");
const { stringify } = require("querystring");
const {
  getTasks,
  addTask,
  removeTask,
  updateTask,
} = require("./todolist-services.js");

const PORT = 8000;

//request -> peticion de solicitud
//response -> respuesta hacia el cliente

http
  .createServer(async (req, res) => {
    //Método GET
    if (req.method == "GET") {
      switch (req.url) {
        case "/":
          res.end(JSON.stringify({ message: "todo-list-server" }));
          break;
        case "/tasks":
          //Regresar la lista de tareas que se encuentra en el archivo todolist.json
          const tasks = await getTasks();
          res.end(JSON.stringify(tasks));
          break;
        default:
          const urlObj = url.parse(request.url, true).pathname.split("/");
          const id = urlObj[urlObj.length - 1];
          const resource = urlObj[urlObj.length - 2];

          if (resource === "tasks") {
            const task = await getTaskById(id);
            response.end(JSON.stringify(task));
          }
      }
    } else if (req.method == "POST") {
      //Método POST
      switch (req.url) {
        case "/tasks":
          //Obtenemos los datos que me está enviando el cliente
          let body = "";
          //Evento data -> se dispara cuando un cliente está enviando datos hacía el servidor
          req.on("data", (data) => {
            body += data.toString();
            console.log(data.toString());
          });
          req.on("end", async () => {
            //Finalizo la entrega / envio de datos por parte del cliente
            let taskObj = createTaskObj(body);
            await addTask(taskObj);
          });
          break;
        default:
          break;
      }
    }
  })
  .listen(PORT);
