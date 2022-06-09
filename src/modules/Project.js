import Task from "./Task";

export default class Project {
    constructor(title) {
        this._id = String(Math.random().toString(16).slice(10));
        this.title = title;
        this.tasks = [];
    }

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id
    }

    getTasksList() {
        return this.tasks
    }

    getTask(id) {
        return this.tasks.find(item => item.id === id)
    }

    addTask(title) {
        const task = new Task(title)
        this.tasks.push(task)
    }

    deleteTask(id) {
        this.tasks.splice(this.tasks.findIndex(item => item.id === id), 1)
    }

    editProject(content) {
        this.title = content
    }

}