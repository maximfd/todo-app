export default class Task {
    constructor(title) {
        this._id = String(Math.random().toString(16).slice(10));
        this.title = title;
        this.isDone = false;
    }

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id
    }

    toggleStatus() {
        this.isDone = !this.isDone
    }
}