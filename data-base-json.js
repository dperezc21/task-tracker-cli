const fs = require('fs');

const fileTaskName = "tasks.json";

function validIfExistsFile(fileName = fileTaskName) {
    if(!fs.existsSync(fileName)) fs.openSync(fileName, "w");
}

function getAllTasks() {
    return fs.readFileSync(fileTaskName, {encoding: "utf-8", flag: "r"});
}

function writeInFile(task, fileName = fileTaskName) {
    fs.writeFileSync(fileName, JSON.stringify(task));
}

module.exports = {
    validIfExistsFile,
    writeInFile,
    getAllTasks
}