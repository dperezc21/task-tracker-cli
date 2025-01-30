const {getAllTasks, writeInFile} = require("./data-base-json");
const { validTaskExists } = require("./valid-task");

class TaskStatus {
    #updateTaskStatus = (taskId, status) => {
        const allTasks = JSON.parse(getAllTasks());
        const findTask = validTaskExists(taskId, allTasks["tasks"]);
        findTask.status = status;
        findTask.updatedAt = new Date();
        allTasks["tasks"] = allTasks["tasks"].map(value => value.id == taskId ? findTask : value);
        writeInFile(allTasks);
    }

    markTaskInProgress = (taskId) => {
        try {
            this.#updateTaskStatus(taskId, "in-progress");
            console.log("task marked in progress")
        } catch (e) {
            console.error(e.message);
        }
    }

    markTaskDone = (taskId) => {
        try {
            this.#updateTaskStatus(taskId, "done");
            console.log("task marked done");
        } catch (e) {
            console.error(e.message);
        }
    }
}

module.exports = new TaskStatus();