export default class UI {
    constructor() {
        this.app = document.querySelector('#root')

        // SECTION --sidebar
        this.sidebar = this.createElement('div', 'sidebar', 'is-active')
        this.logo = this.createLogoSection()
        this.hideBtn = this.createElement('button', 'hide-btn', 'icon-button')
        this.hideBtn.innerHTML = `
                <span class="material-symbols-outlined">
                    menu_open
                </span>`
        this.logo.append(this.hideBtn)

        this.defaultProjects = this.createElement('ul', 'projects-list', 'default-projects')
        this.sideTitleBlock = this.createElement('div', 'side-title-block')
        this.sideTitle = this.createElement('h2', 'projects-title')
        this.sideTitle.textContent = 'Projects'
        this.addProjectBtn = this.createElement('button', 'icon-button', 'expand-form-btn')
        this.addProjectBtn.innerHTML = `
            <span class="material-symbols-outlined">
                    add_box
                </span>`
        this.sideTitleBlock.append(this.sideTitle, this.addProjectBtn)

        // SECTION --main
        this.main = this.createElement('div', 'main')
        this.mainTitle = this.createElement('h2', 'section-title', 'tasks-title')
        this.mainTitle.textContent = 'Tasks'
        this.mainTitle.contentEditable = true

        // LISTS
        this.projectsList = this.createElement('ul', 'projects-list', 'user-projects')
        this.tasksList = this.createElement('ul', 'tasks-list')

        //FORM --projects
        this.projectForm = this.createElement('form', 'form', 'projects-form')
        this.projectInput = this.createFormInput('project', 'New project')
        this.submitProjectBtn = this.createFormButton('submit', 'add', 'form__btn', 'submit-btn')
        this.cancelProjectBtn = this.createFormButton('button', 'cancel', 'form__btn', 'cancel-btn')
        this.projectForm.append(this.projectInput, this.cancelProjectBtn, this.submitProjectBtn)

        // FORM --tasks
        this.taskForm = this.createElement('form', 'form', 'task-form')
        this.taskInput = this.createFormInput('task', 'Add new task')
        this.submitTaskBtn = this.createFormButton('submit', `add`, 'form__btn')
        this.taskForm.append(this.taskInput, this.submitTaskBtn)


        this.sidebar.append(this.logo, this.defaultProjects, this.sideTitleBlock, this.projectForm, this.projectsList)
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

    createLogoSection() {
        const logo = this.createElement('div', 'logo')
        logo.innerHTML = `
                <img class="logo__icon" src="img/logo.png" alt="ToDo App">
                <h1 class="logo__title">ToDo</h1>`
        return logo
    }

    createFormButton(type, text, ...classList) {
        const button = this.createElement('button', ...classList)
        button.type = type
        button.textContent = text
        // button.textContent = 'Create'
        return button
    }

    displayProjects(projects) {
        this.projectsList.innerHTML = ''
        this.defaultProjects.innerHTML = ''
        projects.forEach(element => {
            if (element.id === 'inbox' || element.id === 'today' || element.id === 'upcoming') {
                const defProject = this.createDefaultProject(element.id, element.title)
                this.defaultProjects.appendChild(defProject)
            } else {
                const project = this.createProject(element.id, element.title)
                this.projectsList.appendChild(project)
            }
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
            <button type="button" class="button icon-button delete-btn" name="delete">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>`

        return project
    }

    createDefaultProject(id, title) {
        const project = this.createElement('li', 'project')
        project.dataset.id = id
        project.innerHTML = `
            <span class="project__icon material-symbols-outlined">
                ${id}
            </span>
            <p class="project__title">${title}</p>`

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

        const button = this.createElement('button', 'button', 'icon-button', 'delete-btn')
        button.type = 'button'
        button.name = 'delete'
        button.innerHTML = `
            <span class="material-symbols-outlined">
                delete
            </span>`

        task.append(checkbox, taskTitle, button)

        return task
    }
}