#!/usr/bin/env node

const {addTask, updateTask} = require("./crud-task");

const arguments = process.argv.slice(2, process.argv.length);
const action = arguments[0];
const description = arguments[1];

const taskId = arguments[1];
const desc = arguments[2];

const actionsAllowed = {
    "add": (description) => addTask(description),
    "update": (taskId, description) => updateTask(taskId, description),
}

if(!(action in actionsAllowed)) throw new Error(`action ${action} invalid`);

//actionsAllowed[action](description);
actionsAllowed[action](taskId, desc);