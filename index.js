const express = require("express");
const morgan = require("morgan");
const fs = require("fs/promises");
const path = require("path");
//Crear una instancia de express
const app = express();

const PORT = 8000;

//Middlewares -> Una función que hace de intermediario entre la petición y respuesta hacía el cliente
// | request | response |


//Middleware incorporado (built-in)
app.use(express.urlencoded({extended: true})); //Atiende cualquier tipo de petición -> GET, POST, PUT, DELETE
app.use(express.json());
app.use(express.static("public")); //Indica que el servidor -> servirá archivos estaticos de este directorio

//Middleware de terceros (third party)
app.use(morgan("dev"));

// express.urlencoded({extended: true}) -> decodifica los datos que son enviados a través de x-www-urlencoded
// y los coloca en request.body

// express.json() -> nos ayuda a obtener los datos que son enviados en formato JSON

//Middleware de aplicación (application)
app.get('/', (request, response) => {
  response.sendFile(path.resolve("index.html"));
}); //Atiende peticiones a través del método get

app.get('/tasks', async (request, response) => {
  try{
    const tasks = await fs.readFile("tasks.json", "utf8");
    response.json(JSON.parse(tasks));
  }catch(error){
    console.log(error);
  }
});

app.get('/imagen-gato', (request, response) => {
  response.sendFile(path.resolve("gato.jpg"));
});

app.post('/tasks', (request, response) => {
  console.log(request.body);
}); //Atiende peticiones a través del método POST


app.put('/tasks/:taskId/:userId', (request, response) => {
  console.log(request.params); //Para poder obtener los parametros de una url
});

app.delete('/tasks/:taskId', (request, response) => {
  console.log(request.params); //Para poder obtener los parametros de una url
});

//Configuramos app para escuchar sobre un puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando sobre el puerto ${PORT}`);
});

// http.createServer().listen();