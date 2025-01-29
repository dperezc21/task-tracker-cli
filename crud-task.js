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

function addTask(description) {
    validIfExistsFile();
    const task = buildTask(description);
    const allTasks = "tasks" in JSON.parse(getAllTasks()) ? JSON.parse(getAllTasks()) : { "tasks" : [] };
    task.id = allTasks["tasks"].length + 1;
    allTasks["tasks"].push(task);
    writeInFile(allTasks);
    console.log("task added");
}

function updateTask(taskId, description) {
    try {
        const allTasks = JSON.parse(getAllTasks());
        const findTask = validTaskExists(taskId, allTasks["tasks"]);
        findTask.description = description;
        findTask.updatedAt = new Date();
        allTasks["tasks"] = allTasks["tasks"].map(value => value.id == taskId ? findTask : value);
        writeInFile(allTasks);
        console.log("task updated");
    } catch (e) {
        console.error(e);
    }
}

function deleteTask(taskId) {
    const allTasks = JSON.parse(getAllTasks());
    allTasks["tasks"] = allTasks["tasks"].filter(value => value.id != taskId);
    writeInFile(allTasks);
    console.log("task deleted");
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

function printAllTask() {
    const allTasks = JSON.parse(getAllTasks());
    console.log("TASK LIST =>")
    allTasks["tasks"].forEach(value => {
        console.log(` ID: ${value.id},\n DESCRIPTION: ${value.description},\n STATUS: ${value.status}`)
        console.log("------------//-------------------------//--------------------//----------------")
    });
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    markTaskInProgress,
    markTaskDone,
    printAllTask
};