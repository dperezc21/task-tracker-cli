import {getAllTasks} from "./data-base-json";

class PrintTasks {

    #printTasks(tasks) {
        tasks.forEach(value => {
            console.log(` ID: ${value.id},\n DESCRIPTION: ${value.description},\n STATUS: ${value.status}`)
            console.log("------------//-------------------------//--------------------//----------------")
        });
    }

    #filterTaskByStatus(tasks, status) {
        return tasks.filter(value => value.status === status);
    }

    printAllTasks() {
        const allTasks = JSON.parse(getAllTasks());
        console.log("TASK LIST =>")
        this.#printTasks(allTasks["tasks"]);
    }

    printTodoTasks(status) {
        const allTasks = JSON.parse(getAllTasks());
        const todoTasks = this.#filterTaskByStatus(allTasks["tasks"], status);
        if(!todoTasks.length) return;
        console.log("TODO TASK LIST =>")
        this.#printTasks(todoTasks);
    }

    printInProgressTasks(status) {
        const allTasks = JSON.parse(getAllTasks());
        const inProgressTasks = this.#filterTaskByStatus(allTasks["tasks"], status);
        if(!inProgressTasks.length) return;
        console.log("IN PROGRESS TASK LIST =>")
        this.#printTasks(inProgressTasks);
    }

    printDoneTasks(status) {
        const allTasks = JSON.parse(getAllTasks());
        const doneTasks = this.#filterTaskByStatus(allTasks["tasks"], status);
        if(!doneTasks.length) return;
        console.log("DONE TASK LIST =>")
        this.#printTasks(doneTasks);
    }
}

module.exports = new PrintTasks();