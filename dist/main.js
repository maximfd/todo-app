/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n/* harmony import */ var _modules_ProjectsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ProjectsList */ \"./src/modules/ProjectsList.js\");\n/* harmony import */ var _modules_Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Events */ \"./src/modules/Events.js\");\n\r\n\r\n\r\n\r\nconst model = new _modules_ProjectsList__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\r\nconst view = new _modules_UI__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\nconst app = new _modules_Events__WEBPACK_IMPORTED_MODULE_2__[\"default\"](model, view)\r\n\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ }),

/***/ "./src/modules/Events.js":
/*!*******************************!*\
  !*** ./src/modules/Events.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Events)\n/* harmony export */ });\nclass Events {\r\n    constructor(model, view) {\r\n        this._model = model;\r\n        this._view = view;\r\n\r\n        this.currentProjectId = 'inbox'\r\n\r\n        this._view.displayProjects(this._model.projectsList)\r\n        this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n\r\n        this._view.projectsList.addEventListener('click', this.projectEvents.bind(this))\r\n        this._view.defaultProjects.addEventListener('click', this.projectEvents.bind(this))\r\n        this._view.tasksList.addEventListener('click', this.taskEvents.bind(this))\r\n\r\n        this._view.projectForm.addEventListener('submit', this.submitProjectsForm.bind(this))\r\n        this._view.taskForm.addEventListener('submit', this.submitTasksForm.bind(this))\r\n\r\n        this._view.mainTitle.addEventListener('keypress', this.preventLineBreaks)\r\n        this._view.mainTitle.addEventListener('blur', this.editProject.bind(this))\r\n\r\n        this._view.addProjectBtn.addEventListener('click', this.toggleProjectForm.bind(this))\r\n        this._view.hideBtn.addEventListener('click', this.toggleStatusSidebar.bind(this))\r\n\r\n        this.mediaQueryList = window.matchMedia(\"(max-width: 900px)\");\r\n        this.mediaQueryList.addEventListener('change', this.handleOrientationChange.bind(this));\r\n\r\n        // initial hundler running\r\n        this.handleOrientationChange(this.mediaQueryList);\r\n\r\n        this.setActiveProject()\r\n    }\r\n\r\n    toggleProjectForm() {\r\n        this._view.projectForm.classList.toggle('is-active')\r\n    }\r\n\r\n    toggleStatusSidebar() {\r\n        this._view.sidebar.classList.toggle('is-active')\r\n        this._view.hideBtn.classList.toggle('is-active')\r\n    }\r\n\r\n    handleOrientationChange(mql) {\r\n        if (mql.matches) {\r\n            this._view.sidebar.classList.remove('is-active')\r\n            this._view.hideBtn.classList.add('is-active')\r\n        } else {\r\n            this._view.sidebar.classList.add('is-active')\r\n            this._view.hideBtn.classList.remove('is-active')\r\n        }\r\n    }\r\n\r\n    projectEvents(e) {\r\n        if (e.target.parentElement.name === 'delete') {\r\n            const projectId = e.target.parentElement.parentElement.dataset.id\r\n            this._model.deleteProject(projectId)\r\n            this._view.displayProjects(this._model.projectsList)\r\n        } else {\r\n            // Remove highlighting from current project \r\n            const prev = document.querySelector(`[data-id=\"${this.currentProjectId}\"]`)\r\n            if (prev) prev.classList.toggle('project_active')\r\n            // Set clicked project as current & highlight it \r\n            const project = e.target.closest('li')\r\n            this.currentProjectId = project.dataset.id\r\n            this.setActiveProject()\r\n\r\n            // Display current project tasks list\r\n            this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n        }\r\n\r\n    }\r\n\r\n    taskEvents(e) {\r\n        if (e.target.type === 'checkbox') {\r\n            const taskId = e.target.parentElement.dataset.id\r\n            this._model.toggleStatus(this.currentProjectId, taskId)\r\n        }\r\n        if (e.target.parentElement.name === 'delete') {\r\n            const taskId = e.target.parentElement.parentElement.dataset.id\r\n            this._model.deleteTask(this.currentProjectId, taskId)\r\n            this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n        }\r\n        if (e.target.classList.contains('task-title')) {\r\n            e.target.addEventListener('keypress', this.preventLineBreaks)\r\n            e.target.addEventListener('blur', this.editTask.bind(this))\r\n        }\r\n    }\r\n\r\n    preventLineBreaks(e) {\r\n        if (e.which === 13) e.preventDefault();\r\n    }\r\n\r\n    editTask(e) {\r\n        const taskId = e.target.parentElement.dataset.id\r\n        this._model.editTask(this.currentProjectId, taskId, e.target.textContent)\r\n    }\r\n\r\n    editProject(e) {\r\n        this._model.editProject(this.currentProjectId, e.target.textContent)\r\n    }\r\n\r\n    setActiveProject() {\r\n        const current = document.querySelector(`[data-id=\"${this.currentProjectId}\"]`)\r\n        if (current) current.classList.add('project_active')\r\n    }\r\n\r\n    submitProjectsForm(e) {\r\n        e.preventDefault();\r\n        this._model.addProject(this._view.projectInput.value)\r\n        this._view.projectInput.value = ''\r\n        this._view.displayProjects(this._model.projectsList)\r\n        this.setActiveProject()\r\n    }\r\n\r\n    submitTasksForm(e) {\r\n        e.preventDefault();\r\n        this._model.addTaskToProject(this.currentProjectId, this._view.taskInput.value)\r\n        this._view.taskInput.value = ''\r\n        this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Events.js?");

/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/modules/Task.js\");\n\r\n\r\nclass Project {\r\n    constructor(title) {\r\n        this._id = String(Math.random().toString(16).slice(10));\r\n        this.title = title;\r\n        this.tasks = [];\r\n    }\r\n\r\n    get id() {\r\n        return this._id\r\n    }\r\n\r\n    set id(id) {\r\n        this._id = id\r\n    }\r\n\r\n    getTasksList() {\r\n        return this.tasks\r\n    }\r\n\r\n    getTask(id) {\r\n        return this.tasks.find(item => item.id === id)\r\n    }\r\n\r\n    addTask(title) {\r\n        const task = new _Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title)\r\n        this.tasks.push(task)\r\n    }\r\n\r\n    deleteTask(id) {\r\n        this.tasks.splice(this.tasks.findIndex(item => item.id === id), 1)\r\n    }\r\n\r\n    editProject(content) {\r\n        this.title = content\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Project.js?");

/***/ }),

/***/ "./src/modules/ProjectsList.js":
/*!*************************************!*\
  !*** ./src/modules/ProjectsList.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectsList)\n/* harmony export */ });\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/modules/Task.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n\r\n\r\n\r\nclass ProjectsList {\r\n    constructor() {\r\n        this._projects = this.loadFromStorage()\r\n    }\r\n\r\n    get projectsList() {\r\n        return this._projects\r\n    }\r\n\r\n    getProject(id) {\r\n        return this._projects.find(item => item.id === id)\r\n    }\r\n\r\n    addProject(title) {\r\n        const project = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](title)\r\n        this._projects.push(project)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    deleteProject(id) {\r\n        this._projects.splice(this._projects.findIndex(item => item.id === id), 1)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    addTaskToProject(projectId, taskTitle) {\r\n        this.getProject(projectId).addTask(taskTitle)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    deleteTask(projectId, taskId) {\r\n        this.getProject(projectId).deleteTask(taskId)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    toggleStatus(projectId, taskId) {\r\n        this.getProject(projectId).getTask(taskId).toggleStatus()\r\n        this.saveToStorage()\r\n    }\r\n\r\n    editTask(projectId, taskId, content) {\r\n        this.getProject(projectId).getTask(taskId).editTask(content)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    editProject(projectId, content) {\r\n        this.getProject(projectId).editProject(content)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    loadFromStorage() {\r\n        const projects = localStorage.getItem(\"projectsList\")\r\n\r\n        if (!projects || !JSON.parse(projects).length) {\r\n            return this.setDefaultProjects()\r\n        }\r\n\r\n        return JSON.parse(projects).map(item => {\r\n            const project = Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), item)\r\n            project.tasks = project.tasks.map(task => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), task))\r\n            return project\r\n        })\r\n    }\r\n\r\n    setDefaultProjects() {\r\n        return [\r\n            Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), { id: 'inbox', title: 'Inbox', tasks: [] }),\r\n            Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), { id: 'today', title: 'Today', tasks: [] }),\r\n            Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), { id: 'upcoming', title: 'Upcoming', tasks: [] })\r\n        ]\r\n    }\r\n\r\n    saveToStorage() {\r\n        localStorage.setItem(\"projectsList\", JSON.stringify(this._projects))\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/ProjectsList.js?");

/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\r\n    constructor(title) {\r\n        this._id = String(Math.random().toString(16).slice(10));\r\n        this.title = title;\r\n        this.isDone = false;\r\n    }\r\n\r\n    get id() {\r\n        return this._id\r\n    }\r\n\r\n    set id(id) {\r\n        this._id = id\r\n    }\r\n\r\n    toggleStatus() {\r\n        this.isDone = !this.isDone\r\n    }\r\n\r\n    editTask(content) {\r\n        this.title = content\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Task.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\nclass UI {\r\n    constructor() {\r\n        this.app = document.querySelector('#root')\r\n\r\n        // SECTION --sidebar\r\n        this.sidebar = this.createElement('div', 'sidebar', 'is-active')\r\n        this.logo = this.createLogoSection()\r\n        this.hideBtn = this.createElement('button', 'hide-btn', 'icon-button')\r\n        this.hideBtn.innerHTML = `\r\n                <span class=\"material-symbols-outlined\">\r\n                    menu_open\r\n                </span>`\r\n        this.logo.append(this.hideBtn)\r\n\r\n        this.defaultProjects = this.createElement('ul', 'projects-list', 'default-projects')\r\n        this.sideTitleBlock = this.createElement('div', 'side-title-block')\r\n        this.sideTitle = this.createElement('h2', 'projects-title')\r\n        this.sideTitle.textContent = 'Projects'\r\n        this.addProjectBtn = this.createElement('button', 'icon-button', 'expand-form-btn')\r\n        this.addProjectBtn.innerHTML = `\r\n            <span class=\"material-symbols-outlined\">\r\n                    add_box\r\n                </span>`\r\n        this.sideTitleBlock.append(this.sideTitle, this.addProjectBtn)\r\n\r\n        // SECTION --main\r\n        this.main = this.createElement('div', 'main')\r\n        this.mainTitle = this.createElement('h2', 'section-title', 'tasks-title')\r\n        this.mainTitle.textContent = 'Tasks'\r\n        this.mainTitle.contentEditable = true\r\n\r\n        // LISTS\r\n        this.projectsList = this.createElement('ul', 'projects-list', 'user-projects')\r\n        this.tasksList = this.createElement('ul', 'tasks-list')\r\n\r\n        //FORM --projects\r\n        this.projectForm = this.createElement('form', 'form', 'projects-form')\r\n        this.projectInput = this.createFormInput('project', 'New project')\r\n        this.submitProjectBtn = this.createFormButton('submit', 'add', 'form__btn', 'submit-btn')\r\n        this.cancelProjectBtn = this.createFormButton('button', 'cancel', 'form__btn', 'cancel-btn')\r\n        this.projectForm.append(this.projectInput, this.cancelProjectBtn, this.submitProjectBtn)\r\n\r\n        // FORM --tasks\r\n        this.taskForm = this.createElement('form', 'form', 'task-form')\r\n        this.taskInput = this.createFormInput('task', 'Add new task')\r\n        this.submitTaskBtn = this.createFormButton('submit', `add`, 'form__btn')\r\n        this.taskForm.append(this.taskInput, this.submitTaskBtn)\r\n\r\n\r\n        this.sidebar.append(this.logo, this.defaultProjects, this.sideTitleBlock, this.projectForm, this.projectsList)\r\n        this.main.append(this.mainTitle, this.taskForm, this.tasksList)\r\n\r\n        this.app.append(this.sidebar, this.main)\r\n    }\r\n\r\n    createElement(tag, ...classList) {\r\n        const element = document.createElement(tag)\r\n        element.classList.add(...classList)\r\n        return element\r\n    }\r\n\r\n    createFormInput(name, placeholder = \"\") {\r\n        const input = this.createElement('input', 'form__input')\r\n        input.type = 'text'\r\n        input.placeholder = placeholder\r\n        input.name = name\r\n        return input\r\n    }\r\n\r\n    createLogoSection() {\r\n        const logo = this.createElement('div', 'logo')\r\n        logo.innerHTML = `\r\n                <img class=\"logo__icon\" src=\"img/logo.png\" alt=\"ToDo App\">\r\n                <h1 class=\"logo__title\">ToDo</h1>`\r\n        return logo\r\n    }\r\n\r\n    createFormButton(type, text, ...classList) {\r\n        const button = this.createElement('button', ...classList)\r\n        button.type = type\r\n        button.textContent = text\r\n        // button.textContent = 'Create'\r\n        return button\r\n    }\r\n\r\n    displayProjects(projects) {\r\n        this.projectsList.innerHTML = ''\r\n        this.defaultProjects.innerHTML = ''\r\n        projects.forEach(element => {\r\n            if (element.id === 'inbox' || element.id === 'today' || element.id === 'upcoming') {\r\n                const defProject = this.createDefaultProject(element.id, element.title)\r\n                this.defaultProjects.appendChild(defProject)\r\n            } else {\r\n                const project = this.createProject(element.id, element.title)\r\n                this.projectsList.appendChild(project)\r\n            }\r\n        });\r\n    }\r\n\r\n    displayTasks(project) {\r\n        this.mainTitle.textContent = project.title\r\n        this.tasksList.innerHTML = ''\r\n        project.getTasksList().forEach(element => {\r\n            const task = this.createTask(element.id, element.title, element.isDone)\r\n            this.tasksList.appendChild(task)\r\n        });\r\n    }\r\n\r\n    createProject(id, title) {\r\n        const project = this.createElement('li', 'project')\r\n        project.dataset.id = id\r\n        project.innerHTML = `\r\n            <p class=\"project__title\">${title}</p>\r\n            <button type=\"button\" class=\"button icon-button delete-btn\" name=\"delete\">\r\n                <span class=\"material-symbols-outlined\">\r\n                    delete\r\n                </span>\r\n            </button>`\r\n\r\n        return project\r\n    }\r\n\r\n    createDefaultProject(id, title) {\r\n        const project = this.createElement('li', 'project')\r\n        project.dataset.id = id\r\n        project.innerHTML = `\r\n            <span class=\"project__icon material-symbols-outlined\">\r\n                ${id}\r\n            </span>\r\n            <p class=\"project__title\">${title}</p>`\r\n\r\n        return project\r\n    }\r\n\r\n    createTask(id, title, isDone) {\r\n        const task = this.createElement('li', 'task')\r\n        task.dataset.id = id\r\n\r\n        const checkbox = this.createElement('input', 'task-status')\r\n        checkbox.type = 'checkbox'\r\n        checkbox.name = 'status'\r\n        checkbox.id = 'status'\r\n        checkbox.checked = isDone\r\n\r\n        const taskTitle = this.createElement('p', 'task-title')\r\n        taskTitle.textContent = title\r\n        taskTitle.contentEditable = true\r\n\r\n        const button = this.createElement('button', 'button', 'icon-button', 'delete-btn')\r\n        button.type = 'button'\r\n        button.name = 'delete'\r\n        button.innerHTML = `\r\n            <span class=\"material-symbols-outlined\">\r\n                delete\r\n            </span>`\r\n\r\n        task.append(checkbox, taskTitle, button)\r\n\r\n        return task\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/UI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;