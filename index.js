#!/usr/bin/env node

const {addTask, updateTask} = require("./crud-task");

const arguments = process.argv.slice(2, process.argv.length);
const action = arguments[0];
let description = arguments[1];

let taskId = "";

const actionsAllowed = {
    "add": ({description}) => addTask(description),
    "update": ({taskId, description}) => updateTask(taskId, description),
}

if(!(action in actionsAllowed)) throw new Error(`action ${action} invalid`);

if(action === "add") {
    description = arguments[1];
} else if(action === "update" || action === "delete") {
    taskId = arguments[1];
    description = arguments[2];
}

const data = {
    taskId,
    description
}

actionsAllowed[action](data);