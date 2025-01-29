
const { addTask,
    updateTask,
    deleteTask,
    markTaskInProgress,
    markTaskDone, printAllTasks, printTodoTasks, printInProgressTasks, printDoneTasks,

} = require("./crud-task");

const arguments = process.argv.slice(2, process.argv.length);
let action = arguments[0];
let description = arguments[1];

let taskId = "";
let status = "";

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
    "list": ({}) => printAllTasks(),
    "list-todo": ({status}) => printTodoTasks(status),
    "list-in-progress": ({status}) => printInProgressTasks(status),
    "list-done": ({status}) => printDoneTasks(status)
}

if(!(action in actionsAllowed)) throw new Error(`action ${action} invalid`);

if(action === ADD_ACTION) description = arguments[1];
else if(action === UPDATE_ACTION || action === DELETE_ACTION) {
    taskId = arguments[1];
    description = arguments[2];
} else if(action === MARK_IN_PROGRESS_ACTION || action === MARK_DONE_ACTION) taskId = arguments[1];
else if(action === LIST_ACTION) {
    status = arguments[1];
    action = `${action}-${status}`
}

const data = {
    taskId,
    description,
    status
}

actionsAllowed[action](data);