#!/usr/bin/env node

import TaskManager from "./task-manager.js";
const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    TaskManager.addTask(args.join(" "));
    break;
  case "update":
    const [id, ...description] = args;
    TaskManager.updateTask(id, description.join(" "));
    break;
  case "delete":
    TaskManager.deleteTask(args[0]);
    break;
  case "mark-in-progress":
    TaskManager.markInProgress(args[0]);
    break;
    case "mark-done":
    TaskManager.markDone(args[0]);
    break;
  case "list":
    TaskManager.listOfTask(args[0]);
    break;
  default:
    console.log("Command not found");
}
