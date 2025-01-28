const {getAllTasks, validIfExistsFile, writeInFile} = require("./data-base-json");

const buildTask = (description, status = "todo") => {
    return { description, status, createdAt: new Date(), updatedAt: new Date() }
}

function addTask(description) {
    validIfExistsFile();
    const task = buildTask(description);
    const allTasks = "tasks" in JSON.parse(getAllTasks()) ? JSON.parse(getAllTasks()) : { "tasks" : [] };
    task.id = allTasks["tasks"].length + 1;
    allTasks["tasks"].push(task);
    writeInFile(allTasks);
}

function updateTask(taskId, description) {
    const allTasks = JSON.parse(getAllTasks());
    
}

module.exports = {
    addTask,
    updateTask
};