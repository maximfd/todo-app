export default class Events {
    constructor(model, view) {
        this._model = model;
        this._view = view;

        this.currentProjectId = 'inbox'

        this._view.displayProjects(this._model.projectsList)
        this._view.displayTasks(this._model.getProject(this.currentProjectId))

        this._view.projectsList.addEventListener('click', this.projectEvents.bind(this))
        this._view.defaultProjects.addEventListener('click', this.projectEvents.bind(this))
        this._view.tasksList.addEventListener('click', this.taskEvents.bind(this))

        this._view.projectForm.addEventListener('submit', this.submitProjectsForm.bind(this))
        this._view.taskForm.addEventListener('submit', this.submitTasksForm.bind(this))

        this._view.mainTitle.addEventListener('keypress', this.preventLineBreaks)
        this._view.mainTitle.addEventListener('blur', this.editProject.bind(this))

        this._view.addProjectBtn.addEventListener('click', this.toggleProjectForm.bind(this))
        this._view.hideBtn.addEventListener('click', this.toggleStatusSidebar.bind(this))

        this.mediaQueryList = window.matchMedia("(max-width: 900px)");
        this.mediaQueryList.addEventListener('change', this.handleOrientationChange.bind(this));

        // initial hundler running
        this.handleOrientationChange(this.mediaQueryList);

        this.setActiveProject()
    }

    toggleProjectForm() {
        this._view.projectForm.classList.toggle('is-active')
    }

    toggleStatusSidebar() {
        this._view.sidebar.classList.toggle('is-active')
        this._view.hideBtn.classList.toggle('is-active')
    }

    handleOrientationChange(mql) {
        if (mql.matches) {
            this._view.sidebar.classList.remove('is-active')
            this._view.hideBtn.classList.add('is-active')
        } else {
            this._view.sidebar.classList.add('is-active')
            this._view.hideBtn.classList.remove('is-active')
        }
    }

    projectEvents(e) {
        if (e.target.parentElement.name === 'delete') {
            const projectId = e.target.parentElement.parentElement.dataset.id
            this._model.deleteProject(projectId)
            this._view.displayProjects(this._model.projectsList)
        } else {
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

    }

    taskEvents(e) {
        if (e.target.type === 'checkbox') {
            const taskId = e.target.parentElement.dataset.id
            this._model.toggleStatus(this.currentProjectId, taskId)
        }
        if (e.target.parentElement.name === 'delete') {
            const taskId = e.target.parentElement.parentElement.dataset.id
            this._model.deleteTask(this.currentProjectId, taskId)
            this._view.displayTasks(this._model.getProject(this.currentProjectId))
        }
        if (e.target.classList.contains('task-title')) {
            e.target.addEventListener('keypress', this.preventLineBreaks)
            e.target.addEventListener('blur', this.editTask.bind(this))
        }
    }

    preventLineBreaks(e) {
        if (e.which === 13) e.preventDefault();
    }

    editTask(e) {
        const taskId = e.target.parentElement.dataset.id
        this._model.editTask(this.currentProjectId, taskId, e.target.textContent)
    }

    editProject(e) {
        this._model.editProject(this.currentProjectId, e.target.textContent)
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