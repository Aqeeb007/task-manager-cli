import fs from "fs/promises";
import path from "path";

const tasksFilePath = path.join(process.cwd(), "tasks.json");

const initFile = async () => {
  try {
    await fs.access(tasksFilePath);
  } catch (error) {
    await fs.writeFile(tasksFilePath, "[]", "utf-8");
  }
};

const loadTasks = async () => {
  await initFile();
  const tasks = await fs.readFile(tasksFilePath, "utf-8");
  return JSON.parse(tasks);
};

const saveTasks = async (list) => {
  await fs.writeFile(tasksFilePath, JSON.stringify(list), "utf-8");
};

const addTask = async (args) => {
  const list = await loadTasks();

  const task = {
    id: Date.now(),
    description: args,
    status: "todo",
    createdAt: new Date().toLocaleDateString("en-US", {
      dateStyle: "full",
    }),
    updatedAt: new Date().toLocaleDateString("en-US", {
      dateStyle: "full",
    }),
  };

  list.push(task);
  await saveTasks(list);
  console.log(`Task added successfully (ID: ${task.id})`);
};

const updateTask = async (id, description) => {
  const list = await loadTasks();

  const task = list.find((t) => t.id === parseInt(id));

  if (!task) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toLocaleDateString("en-US", {
    dateStyle: "full",
  });

  await saveTasks(list);
  console.log(`Task updated successfully (ID: ${task.id})`);
};

const deleteTask = async (id) => {
  const list = await loadTasks();
  const newList = list.filter((t) => t.id !== parseInt(id));

  if (list.length === newList.length) {
    console.log(`Task with ID: ${id} not found.`);
    return;
  }

  await saveTasks(newList);
  console.log(`Task deleted successfully (ID: ${id})`);
};

const listOfTask = async (filter = null) => {
  const list = await loadTasks();
  const filteredTasks = filter
    ? list.filter((task) => task.status.toLowerCase() === filter)
    : list;

  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filteredTasks.forEach((task) => {
    console.log(
      `${task.id} | ${task.status.toUpperCase()} | ${task.description} | ${
        task.createdAt
      }`
    );
  });
};

const markInProgress = async (id) => {
  const list = await loadTasks();
  const task = list.find((t) => t.id === parseInt(id));

  if (!task) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  task.status = "in-progress";

  await saveTasks(list);
  console.log(`Task ${id} marked as IN-PROGRESS`);
};

const markDone = async (id) => {
  const list = await loadTasks();
  const task = list.find((t) => t.id === parseInt(id));

  if (!task) {
    console.log(`Task with ID ${id} not found`);
    return;
  }

  task.status = "done";

  await saveTasks(list);
  console.log(`Task ${id} marked as DONE`);
};

export default {
  addTask,
  updateTask,
  deleteTask,
  markInProgress,
  markDone,
  listOfTask,
};
