const {getAllTasks, validIfExistsFile, writeInFile} = require("./data-base-json");
const { validTaskExists } = require("./valid-task");

class CrudTask {
    #buildTask = (description, status = "todo") => {
        return { description, status, createdAt: new Date(), updatedAt: new Date() }
    }

    #newTaskId(tasks) {
        if(!tasks?.length) return 1;
        return tasks.at(-1).id + 1;
    }

    addTask(description) {
        validIfExistsFile();
        const task = this.#buildTask(description);
        let allTasks = getAllTasks() ? JSON.parse(getAllTasks()) : { "tasks" : [] };
        task.id = this.#newTaskId(allTasks["tasks"]);
        if("tasks" in allTasks) allTasks["tasks"].push(task);
        else allTasks = {tasks: [task]}
        writeInFile(allTasks);
        console.log(`Task added successfully (ID: ${task.id})`);
    }

    updateTask(taskId, description) {
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

    deleteTask(taskId) {
        const allTasks = JSON.parse(getAllTasks());
        allTasks["tasks"] = allTasks["tasks"].filter(value => value.id != taskId);
        writeInFile(allTasks);
        console.log("Task deleted successfully");
    }

}

module.exports = new CrudTask();
