import Task from "./Task";
import Project from "./Project";

export default class ProjectsList {
    constructor() {
        this._projects = this.loadFromStorage()
    }

    get projectsList() {
        return this._projects
    }

    getProject(id) {
        return this._projects.find(item => item.id === id)
    }

    addProject(title) {
        const project = new Project(title)
        this._projects.push(project)
        this.saveToStorage()
    }

    deleteProject(id) {
        this._projects.splice(this._projects.findIndex(item => item.id === id), 1)
        this.saveToStorage()
    }

    addTaskToProject(projectId, taskTitle) {
        this.getProject(projectId).addTask(taskTitle)
        this.saveToStorage()
    }

    deleteTask(projectId, taskId) {
        this.getProject(projectId).deleteTask(taskId)
        this.saveToStorage()
    }

    toggleStatus(projectId, taskId) {
        this.getProject(projectId).getTask(taskId).toggleStatus()
        this.saveToStorage()
    }

    editTask(projectId, taskId, content) {
        this.getProject(projectId).getTask(taskId).editTask(content)
        this.saveToStorage()
    }

    editProject(projectId, content) {
        this.getProject(projectId).editProject(content)
        this.saveToStorage()
    }

    loadFromStorage() {
        const projects = localStorage.getItem("projectsList")

        if (!projects || !JSON.parse(projects).length) {
            return this.setDefaultProjects()
        }

        return JSON.parse(projects).map(item => {
            const project = Object.assign(new Project(), item)
            project.tasks = project.tasks.map(task => Object.assign(new Task(), task))
            return project
        })
    }

    setDefaultProjects() {
        return [
            Object.assign(new Project(), { id: 'inbox', title: 'Inbox', tasks: [] }),
            Object.assign(new Project(), { id: 'today', title: 'Today', tasks: [] }),
            Object.assign(new Project(), { id: 'upcoming', title: 'Upcoming', tasks: [] })
        ]
    }

    saveToStorage() {
        localStorage.setItem("projectsList", JSON.stringify(this._projects))
    }
}