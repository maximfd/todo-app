export default class UI {
    constructor() {
        this.app = document.querySelector('#root')

        this.sidebar = document.createElement('div')
        this.sidebar.classList.add('sidebar')
        this.sideTitle = document.createElement('h2')
        this.sideTitle.classList.add('section-title', 'projects-title')
        this.sideTitle.textContent = 'Projects'
        this.projectsList = document.createElement('ul')
        this.projectsList.classList.add('projects-list')

        this.projectForm = document.createElement('form')
        this.projectForm.classList.add('form', 'projects-form')
        this.projectForm.innerHTML = `
            <input class="form__input" type="text" placeholder="Add new project" name="project">
            <button class="form__btn" type="submit">&#43;</button>`

        this.sidebar.append(this.sideTitle, this.projectForm, this.projectsList)

        this.main = document.createElement('div')
        this.main.classList.add('main')
        this.mainTitle = document.createElement('h2')
        this.mainTitle.classList.add('section-title', 'tasks-title')
        this.mainTitle.textContent = 'Tasks'
        this.tasksList = document.createElement('ul')
        this.tasksList.classList.add('tasks-list')

        this.taskForm = document.createElement('form')
        this.taskForm.classList.add('form', 'task-form')
        this.taskForm.innerHTML = `
            <input class="form__input" type="text" placeholder="Add new task" name="task">
            <button class="form__btn" type="submit">&#43;</button>`

        this.main.append(this.mainTitle, this.taskForm, this.tasksList)

        this.app.append(this.sidebar, this.main)
    }

    displayProjects(projects) {
        this.projectsList.innerHTML = ''
        projects.forEach(element => {
            const project = this.createProject(element.id, element.title)
            this.projectsList.appendChild(project)
        });
    }

    displayTasks(project) {
        this.tasksList.innerHTML = ''
        project.getTasksList().forEach(element => {
            const task = this.createTask(element.id, element.title)
            this.tasksList.appendChild(task)
        });
    }

    createProject(id, title) {
        const project = document.createElement('li')
        project.classList.add('project')
        project.dataset.id = id
        project.innerHTML = `
            <p class="project__title">${title}</p>
            <button type="button" class="button icon-button">
                &#x2716;
            </button>`

        return project
    }

    createTask(id, title) {
        const task = document.createElement('li')
        task.classList.add('task')
        task.dataset.id = id
        task.innerHTML = `
            <input type="checkbox" name="status" id="status">
            <p class="task-title">${title}</p>
            <button type="button" class="button icon-button">
                &#x2716;
            </button>`

        return task
    }
}