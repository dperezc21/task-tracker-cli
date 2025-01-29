
class TaskNotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    TaskNotFoundError
}