
const { addTask,
    updateTask,
    deleteTask,
    markTaskInProgress,
    markTaskDone,
    printAllTask
} = require("./crud-task");

const arguments = process.argv.slice(2, process.argv.length);
const action = arguments[0];
let description = arguments[1];

let taskId = "";

const ADD_ACTION = "add";
const UPDATE_ACTION = "update";
const DELETE_ACTION = "delete";
const MARK_IN_PROGRESS_ACTION = "mark-in-progress";
const MARK_DONE_ACTION = "mark-done";
const LIST_ACTION = "list";

const actionsAllowed = {
    "add": ({description}) => addTask(description),
    "update": ({taskId, description}) => updateTask(taskId, description),
    "delete": ({taskId}) => deleteTask(taskId),
    "mark-in-progress": ({ taskId }) => markTaskInProgress(taskId),
    "mark-done": ({ taskId }) => markTaskDone(taskId),
    "list": ({}) => printAllTask()
}

if(!(action in actionsAllowed)) throw new Error(`action ${action} invalid`);

if(action === ADD_ACTION) description = arguments[1];
else if(action === UPDATE_ACTION || action === DELETE_ACTION) {
    taskId = arguments[1];
    description = arguments[2];
} else if(action === MARK_IN_PROGRESS_ACTION || action === MARK_DONE_ACTION || action === LIST_ACTION) taskId = arguments[1];

const data = {
    taskId,
    description
}

actionsAllowed[action](data);