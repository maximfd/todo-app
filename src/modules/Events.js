export default class Events {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this.currentProjectId = this._model.projectsList[0].id

        this._view.displayProjects(this._model.projectsList)
        this._view.displayTasks(this._model.getProject(this.currentProjectId))

        this._view.projectsList.addEventListener('click', this.projectEvents.bind(this))

        this._view.projectForm.addEventListener('submit', this.submitProjectsForm.bind(this))
        this._view.taskForm.addEventListener('submit', this.submitTasksForm.bind(this))

        this.setActiveProject()
    }

    projectEvents(e) {
        // Remove highlighting from current project 
        const prev = document.querySelector(`[data-id="${this.currentProjectId}"]`)
        if (prev) prev.classList.toggle('project_active')
        // Set clicked project as current & highlight it 
        const project = e.target.closest('li')
        this.currentProjectId = project.dataset.id
        this.setActiveProject()

        // Display current project tasks list
        this._view.displayTasks(this._model.getProject(this.currentProjectId))
    }

    setActiveProject() {
        const current = document.querySelector(`[data-id="${this.currentProjectId}"]`)
        if (current) current.classList.add('project_active')
    }

    submitProjectsForm(e) {
        e.preventDefault();
        this._model.addProject(this._view.projectInput.value)
        this._view.projectInput.value = ''
        this._view.displayProjects(this._model.projectsList)
        this.setActiveProject()
    }

    submitTasksForm(e) {
        e.preventDefault();
        this._model.addTaskToProject(this.currentProjectId, this._view.taskInput.value)
        this._view.taskInput.value = ''
        this._view.displayTasks(this._model.getProject(this.currentProjectId))
    }
}