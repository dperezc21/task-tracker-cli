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
    console.log("task added");
}

function updateTask(taskId, description) {
    const allTasks = JSON.parse(getAllTasks());
    const findTask = allTasks["tasks"].find(value => value.id == taskId);
    if(findTask == -1 || !findTask) {
        console.error(`task with id ${taskId} not exists`);
        return;
    }
    findTask.description = description;
    allTasks["tasks"] = allTasks["tasks"].map(value => value.id == taskId ? findTask : value);
    writeInFile(allTasks);
    console.log("task updated");

}

module.exports = {
    addTask,
    updateTask
};