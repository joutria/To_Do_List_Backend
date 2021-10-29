const { Router } = require("express");
const {
  getTasksCtrl,
  getTaskByIdCtrl,
  postTaskCtrl,
  putTaskCtrl,
  deleteTaskCtrl,
} = require("../controllers/tasks.controller");

const router = Router();

router.get("/tasks", getTasksCtrl);
router.get("/tasks/:id", getTaskByIdCtrl);
router.post("/tasks", postTaskCtrl);
router.put("/tasks/:id", putTaskCtrl);
router.delete("/tasks/:id", deleteTaskCtrl);

module.exports = router;
