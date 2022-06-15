export default class UI {
    constructor() {
        this.app = document.querySelector('#root')

        // SECTION --sidebar
        this.sidebar = this.createElement('div', 'sidebar')
        this.sideTitle = this.createElement('h2', 'section-title', 'projects-title')
        this.sideTitle.textContent = 'Projects'

        // SECTION --main
        this.main = this.createElement('div', 'main')
        this.mainTitle = this.createElement('h2', 'section-title', 'tasks-title')
        this.mainTitle.textContent = 'Tasks'
        this.mainTitle.contentEditable = true

        // LISTS
        this.projectsList = this.createElement('ul', 'projects-list')
        this.tasksList = this.createElement('ul', 'tasks-list')

        //FORM --projects
        this.projectForm = this.createElement('form', 'form', 'projects-form')
        this.projectInput = this.createFormInput('project', 'Add new project')
        this.submitProjectBtn = this.createSubmitButton('form__btn')
        this.projectForm.append(this.projectInput, this.submitProjectBtn)

        // FORM --tasks
        this.taskForm = this.createElement('form', 'form', 'task-form')
        this.taskInput = this.createFormInput('task', 'Add new task')
        this.submitTaskBtn = this.createSubmitButton('form__btn')
        this.taskForm.append(this.taskInput, this.submitTaskBtn)


        this.sidebar.append(this.sideTitle, this.projectForm, this.projectsList)
        this.main.append(this.mainTitle, this.taskForm, this.tasksList)

        this.app.append(this.sidebar, this.main)
    }

    createElement(tag, ...classList) {
        const element = document.createElement(tag)
        element.classList.add(...classList)
        return element
    }

    createFormInput(name, placeholder = "") {
        const input = this.createElement('input', 'form__input')
        input.type = 'text'
        input.placeholder = placeholder
        input.name = name
        return input
    }

    createSubmitButton(...classList) {
        const button = this.createElement('button', ...classList)
        button.type = 'submit'
        button.innerHTML = '&#43;'
        return button
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
        const project = this.createElement('li', 'project')
        project.dataset.id = id
        project.innerHTML = `
            <p class="project__title">${title}</p>
            <button type="button" class="button icon-button" name="delete">
                &#x2716;
            </button>`

        return project
    }

    createTask(id, title, isDone) {
        const task = this.createElement('li', 'task')
        task.dataset.id = id

        const checkbox = this.createElement('input', 'task-status')
        checkbox.type = 'checkbox'
        checkbox.name = 'status'
        checkbox.id = 'status'
        checkbox.checked = isDone

        const taskTitle = this.createElement('p', 'task-title')
        taskTitle.textContent = title
        taskTitle.contentEditable = true

        const button = this.createElement('button', 'button', 'icon-button')
        button.type = 'button'
        button.name = 'delete'
        button.innerHTML = '&#x2716'

        task.append(checkbox, taskTitle, button)

        return task
    }
}