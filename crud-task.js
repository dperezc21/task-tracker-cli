const {getAllTasks, validIfExistsFile, writeInFile} = require("./data-base-json");
const {TaskNotFoundError} = require("./exceptions");

const buildTask = (description, status = "todo") => {
    return { description, status, createdAt: new Date(), updatedAt: new Date() }
}

function validTaskExists(taskId, tasks) {
    const findTask = tasks.find(value => value.id == taskId);
    if(findTask == -1 || !findTask) throw new TaskNotFoundError(`task with id ${taskId} not exists`)
    return findTask;
}

function newTaskId(tasks) {
    if(!tasks?.length) return 1;
    return tasks.at(-1).id + 1;
}

function addTask(description) {
    validIfExistsFile();
    const task = buildTask(description);
    let allTasks = getAllTasks() ? JSON.parse(getAllTasks()) : { "tasks" : [] };
    task.id = newTaskId(allTasks["tasks"]);
    if("tasks" in allTasks) allTasks["tasks"].push(task); else allTasks = {tasks: [task]}
    writeInFile(allTasks);
    console.log(`Task added successfully (ID: ${task.id})`);
}

function updateTask(taskId, description) {
    try {
        const allTasks = JSON.parse(getAllTasks());
        const findTask = validTaskExists(taskId, allTasks["tasks"]);
        findTask.description = description;
        findTask.updatedAt = new Date();
        allTasks["tasks"] = allTasks["tasks"].map(value => value.id == taskId ? findTask : value);
        writeInFile(allTasks);
        console.log("Task updated successfully");
    } catch (e) {
        console.error(e);
    }
}

function deleteTask(taskId) {
    const allTasks = JSON.parse(getAllTasks());
    allTasks["tasks"] = allTasks["tasks"].filter(value => value.id != taskId);
    writeInFile(allTasks);
    console.log("Task deleted successfully");
}

function updateTaskStatus(taskId, status)  {
    const allTasks = JSON.parse(getAllTasks());
    const findTask = validTaskExists(taskId, allTasks["tasks"]);
    findTask.status = status;
    findTask.updatedAt = new Date();
    allTasks["tasks"] = allTasks["tasks"].map(value => value.id == taskId ? findTask : value);
    writeInFile(allTasks);
}

function markTaskInProgress(taskId) {
    try {
        updateTaskStatus(taskId, "in-progress");
        console.log("task marked in progress")
    } catch (e) {
        console.error(e.message);
    }
}

function markTaskDone(taskId) {
    try {
        updateTaskStatus(taskId, "done");
        console.log("task marked done");
    } catch (e) {
        console.error(e.message);
    }
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    markTaskInProgress,
    markTaskDone
};