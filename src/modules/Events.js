export default class Events {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this.currentProjectId = this._model.projectsList[0].id

        this._view.displayProjects(this._model.projectsList)
        this._view.displayTasks(this._model.getProject(this.currentProjectId))
    }
}