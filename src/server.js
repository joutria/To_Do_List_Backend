const app = require("./app");
require("dotenv").config(); // carga las variables del archivo .env
const { getTasks } = require("./services/tasks.services");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("escuchando al puerto: ", PORT);
  getTasks();
});
