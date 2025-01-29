const {TaskNotFoundError} = require("./exceptions");

class ValidTask {
    validTaskExists(taskId, tasks) {
        const findTask = tasks.find(value => value.id == taskId);
        if(findTask == -1 || !findTask) throw new TaskNotFoundError(`task with id ${taskId} not exists`)
        return findTask;
    }
}

module.exports = new ValidTask();