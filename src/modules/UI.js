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

        this.projectInput = document.createElement('input')
        this.projectInput.classList.add('form__input')
        this.projectInput.type = 'text'
        this.projectInput.placeholder = 'Add new project'
        this.projectInput.name = 'project'

        this.submitProjectBtn = document.createElement('button')
        this.submitProjectBtn.classList.add('form__btn')
        this.submitProjectBtn.type = 'submit'
        this.submitProjectBtn.innerHTML = '&#43;'

        this.projectForm.append(this.projectInput, this.submitProjectBtn)


        this.sidebar.append(this.sideTitle, this.projectForm, this.projectsList)

        this.main = document.createElement('div')
        this.main.classList.add('main')
        this.mainTitle = document.createElement('h2')
        this.mainTitle.classList.add('section-title', 'tasks-title')
        this.mainTitle.textContent = 'Tasks'
        this.mainTitle.contentEditable = true
        this.tasksList = document.createElement('ul')
        this.tasksList.classList.add('tasks-list')

        this.taskForm = document.createElement('form')
        this.taskForm.classList.add('form', 'task-form')

        this.taskInput = document.createElement('input')
        this.taskInput.classList.add('form__input')
        this.taskInput.type = 'text'
        this.taskInput.placeholder = 'Add new project'
        this.taskInput.name = 'project'

        this.submitTaskBtn = document.createElement('button')
        this.submitTaskBtn.classList.add('form__btn')
        this.submitTaskBtn.type = 'submit'
        this.submitTaskBtn.innerHTML = '&#43;'

        this.taskForm.append(this.taskInput, this.submitTaskBtn)

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
        this.mainTitle.textContent = project.title
        this.tasksList.innerHTML = ''
        project.getTasksList().forEach(element => {
            const task = this.createTask(element.id, element.title, element.isDone)
            this.tasksList.appendChild(task)
        });
    }

    createProject(id, title) {
        const project = document.createElement('li')
        project.classList.add('project')
        project.dataset.id = id
        project.innerHTML = `
            <p class="project__title">${title}</p>
            <button type="button" class="button icon-button" name="delete">
                &#x2716;
            </button>`

        return project
    }

    createTask(id, title, isDone) {
        const task = document.createElement('li')
        task.classList.add('task')
        task.dataset.id = id

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.name = 'status'
        checkbox.id = 'status'
        checkbox.checked = isDone

        const taskTitle = document.createElement('p')
        taskTitle.classList.add('task-title')
        taskTitle.textContent = title
        taskTitle.contentEditable = true

        const button = document.createElement('button')
        button.type = 'button'
        button.name = 'delete'
        button.classList.add('button', 'icon-button')
        button.innerHTML = '&#x2716'

        task.append(checkbox, taskTitle, button)

        return task
    }
}