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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Events)\n/* harmony export */ });\nclass Events {\r\n    constructor(model, view) {\r\n        this._model = model;\r\n        this._view = view;\r\n\r\n        this.currentProjectId = this._model.projectsList[0].id\r\n\r\n        this._view.displayProjects(this._model.projectsList)\r\n        this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n\r\n        this._view.projectsList.addEventListener('click', this.projectEvents.bind(this))\r\n        this._view.tasksList.addEventListener('click', this.taskEvents.bind(this))\r\n\r\n        this._view.projectForm.addEventListener('submit', this.submitProjectsForm.bind(this))\r\n        this._view.taskForm.addEventListener('submit', this.submitTasksForm.bind(this))\r\n\r\n        this.setActiveProject()\r\n    }\r\n\r\n    projectEvents(e) {\r\n        if (e.target.name === 'delete') {\r\n            const projectId = e.target.parentElement.dataset.id\r\n            this._model.deleteProject(projectId)\r\n            this._view.displayProjects(this._model.projectsList)\r\n        } else {\r\n            // Remove highlighting from current project \r\n            const prev = document.querySelector(`[data-id=\"${this.currentProjectId}\"]`)\r\n            if (prev) prev.classList.toggle('project_active')\r\n            // Set clicked project as current & highlight it \r\n            const project = e.target.closest('li')\r\n            this.currentProjectId = project.dataset.id\r\n            this.setActiveProject()\r\n\r\n            // Display current project tasks list\r\n            this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n        }\r\n\r\n    }\r\n\r\n    taskEvents(e) {\r\n        console.log(e.target.checked);\r\n        if (e.target.type === 'checkbox') {\r\n            const taskId = e.target.parentElement.dataset.id\r\n            this._model.toggleStatus(this.currentProjectId, taskId)\r\n        }\r\n        if (e.target.name === 'delete') {\r\n            const taskId = e.target.parentElement.dataset.id\r\n            this._model.deleteTask(this.currentProjectId, taskId)\r\n            this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n        }\r\n    }\r\n\r\n    setActiveProject() {\r\n        const current = document.querySelector(`[data-id=\"${this.currentProjectId}\"]`)\r\n        if (current) current.classList.add('project_active')\r\n    }\r\n\r\n    submitProjectsForm(e) {\r\n        e.preventDefault();\r\n        this._model.addProject(this._view.projectInput.value)\r\n        this._view.projectInput.value = ''\r\n        this._view.displayProjects(this._model.projectsList)\r\n        this.setActiveProject()\r\n    }\r\n\r\n    submitTasksForm(e) {\r\n        e.preventDefault();\r\n        this._model.addTaskToProject(this.currentProjectId, this._view.taskInput.value)\r\n        this._view.taskInput.value = ''\r\n        this._view.displayTasks(this._model.getProject(this.currentProjectId))\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Events.js?");

/***/ }),

/***/ "./src/modules/Project.js":
/*!********************************!*\
  !*** ./src/modules/Project.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Project)\n/* harmony export */ });\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/modules/Task.js\");\n\r\n\r\nclass Project {\r\n    constructor(title) {\r\n        this._id = String(Math.random().toString(16).slice(10));\r\n        this.title = title;\r\n        this.tasks = [];\r\n    }\r\n\r\n    get id() {\r\n        return this._id\r\n    }\r\n\r\n    set id(id) {\r\n        this._id = id\r\n    }\r\n\r\n    getTasksList() {\r\n        return this.tasks\r\n    }\r\n\r\n    getTask(id) {\r\n        return this.tasks.find(item => item.id === id)\r\n    }\r\n\r\n    addTask(title) {\r\n        const task = new _Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](title)\r\n        this.tasks.push(task)\r\n    }\r\n\r\n    deleteTask(id) {\r\n        this.tasks.splice(this.tasks.findIndex(item => item.id === id), 1)\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Project.js?");

/***/ }),

/***/ "./src/modules/ProjectsList.js":
/*!*************************************!*\
  !*** ./src/modules/ProjectsList.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ProjectsList)\n/* harmony export */ });\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/modules/Task.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/modules/Project.js\");\n\r\n\r\n\r\nclass ProjectsList {\r\n    constructor() {\r\n        this._projects = this.loadFromStorage()\r\n    }\r\n\r\n    get projectsList() {\r\n        return this._projects\r\n    }\r\n\r\n    getProject(id) {\r\n        return this._projects.find(item => item.id === id)\r\n    }\r\n\r\n    addProject(title) {\r\n        const project = new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](title)\r\n        this._projects.push(project)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    deleteProject(id) {\r\n        this._projects.splice(this._projects.findIndex(item => item.id === id), 1)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    addTaskToProject(projectId, taskTitle) {\r\n        this.getProject(projectId).addTask(taskTitle)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    deleteTask(projectId, taskId) {\r\n        this.getProject(projectId).deleteTask(taskId)\r\n        this.saveToStorage()\r\n    }\r\n\r\n    toggleStatus(projectId, taskId) {\r\n        this.getProject(projectId).getTask(taskId).toggleStatus()\r\n        this.saveToStorage()\r\n    }\r\n\r\n    loadFromStorage() {\r\n        const projects = localStorage.getItem(\"projectsList\")\r\n        if (!projects) return []\r\n        return JSON.parse(projects).map(item => {\r\n            const project = Object.assign(new _Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"](), item)\r\n            project.tasks = project.tasks.map(task => Object.assign(new _Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), task))\r\n            return project\r\n        })\r\n    }\r\n\r\n    saveToStorage() {\r\n        localStorage.setItem(\"projectsList\", JSON.stringify(this._projects))\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/ProjectsList.js?");

/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\r\n    constructor(title) {\r\n        this._id = String(Math.random().toString(16).slice(10));\r\n        this.title = title;\r\n        this.isDone = false;\r\n    }\r\n\r\n    get id() {\r\n        return this._id\r\n    }\r\n\r\n    set id(id) {\r\n        this._id = id\r\n    }\r\n\r\n    toggleStatus() {\r\n        this.isDone = !this.isDone\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/Task.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\nclass UI {\r\n    constructor() {\r\n        this.app = document.querySelector('#root')\r\n\r\n        this.sidebar = document.createElement('div')\r\n        this.sidebar.classList.add('sidebar')\r\n        this.sideTitle = document.createElement('h2')\r\n        this.sideTitle.classList.add('section-title', 'projects-title')\r\n        this.sideTitle.textContent = 'Projects'\r\n        this.projectsList = document.createElement('ul')\r\n        this.projectsList.classList.add('projects-list')\r\n\r\n        this.projectForm = document.createElement('form')\r\n        this.projectForm.classList.add('form', 'projects-form')\r\n\r\n        this.projectInput = document.createElement('input')\r\n        this.projectInput.classList.add('form__input')\r\n        this.projectInput.type = 'text'\r\n        this.projectInput.placeholder = 'Add new project'\r\n        this.projectInput.name = 'project'\r\n\r\n        this.submitProjectBtn = document.createElement('button')\r\n        this.submitProjectBtn.classList.add('form__btn')\r\n        this.submitProjectBtn.type = 'submit'\r\n        this.submitProjectBtn.innerHTML = '&#43;'\r\n\r\n        this.projectForm.append(this.projectInput, this.submitProjectBtn)\r\n\r\n\r\n        this.sidebar.append(this.sideTitle, this.projectForm, this.projectsList)\r\n\r\n        this.main = document.createElement('div')\r\n        this.main.classList.add('main')\r\n        this.mainTitle = document.createElement('h2')\r\n        this.mainTitle.classList.add('section-title', 'tasks-title')\r\n        this.mainTitle.textContent = 'Tasks'\r\n        this.tasksList = document.createElement('ul')\r\n        this.tasksList.classList.add('tasks-list')\r\n\r\n        this.taskForm = document.createElement('form')\r\n        this.taskForm.classList.add('form', 'task-form')\r\n\r\n        this.taskInput = document.createElement('input')\r\n        this.taskInput.classList.add('form__input')\r\n        this.taskInput.type = 'text'\r\n        this.taskInput.placeholder = 'Add new project'\r\n        this.taskInput.name = 'project'\r\n\r\n        this.submitTaskBtn = document.createElement('button')\r\n        this.submitTaskBtn.classList.add('form__btn')\r\n        this.submitTaskBtn.type = 'submit'\r\n        this.submitTaskBtn.innerHTML = '&#43;'\r\n\r\n        this.taskForm.append(this.taskInput, this.submitTaskBtn)\r\n\r\n        this.main.append(this.mainTitle, this.taskForm, this.tasksList)\r\n\r\n        this.app.append(this.sidebar, this.main)\r\n    }\r\n\r\n    displayProjects(projects) {\r\n        this.projectsList.innerHTML = ''\r\n        projects.forEach(element => {\r\n            const project = this.createProject(element.id, element.title)\r\n            this.projectsList.appendChild(project)\r\n        });\r\n    }\r\n\r\n    displayTasks(project) {\r\n        this.tasksList.innerHTML = ''\r\n        project.getTasksList().forEach(element => {\r\n            const task = this.createTask(element.id, element.title, element.isDone)\r\n            this.tasksList.appendChild(task)\r\n        });\r\n    }\r\n\r\n    createProject(id, title) {\r\n        const project = document.createElement('li')\r\n        project.classList.add('project')\r\n        project.dataset.id = id\r\n        project.innerHTML = `\r\n            <p class=\"project__title\">${title}</p>\r\n            <button type=\"button\" class=\"button icon-button\" name=\"delete\">\r\n                &#x2716;\r\n            </button>`\r\n\r\n        return project\r\n    }\r\n\r\n    createTask(id, title, isDone) {\r\n        const task = document.createElement('li')\r\n        task.classList.add('task')\r\n        task.dataset.id = id\r\n\r\n        const checkbox = document.createElement('input')\r\n        checkbox.type = 'checkbox'\r\n        checkbox.name = 'status'\r\n        checkbox.id = 'status'\r\n        checkbox.checked = isDone\r\n\r\n        const taskTitle = document.createElement('p')\r\n        taskTitle.classList.add('task-title')\r\n        taskTitle.textContent = title\r\n\r\n        const button = document.createElement('button')\r\n        button.type = 'button'\r\n        button.name = 'delete'\r\n        button.classList.add('button', 'icon-button')\r\n        button.innerHTML = '&#x2716'\r\n\r\n        task.append(checkbox, taskTitle, button)\r\n\r\n        return task\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/UI.js?");

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