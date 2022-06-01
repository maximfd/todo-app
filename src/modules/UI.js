export default class UI {
    constructor() {
        this.app = document.querySelector('#root')

        this.sidebar = document.createElement('div')
        this.sidebar.classList.add('sidebar')
        this.sideTitle = document.createElement('h2')
        this.sideTitle.textContent = 'Projects'
        this.projectsList = document.createElement('ul')
        this.projectsList.classList.add('projects-list')
        this.sidebar.append(this.sideTitle, this.projectsList)

        this.main = document.createElement('div')
        this.main.classList.add('main')
        this.mainTitle = document.createElement('h2')
        this.mainTitle.textContent = 'Tasks'
        this.tasksList = document.createElement('ul')
        this.tasksList.classList.add('tasks-list')
        this.main.append(this.mainTitle, this.tasksList)

        this.app.append(this.sidebar, this.main)
    }
}