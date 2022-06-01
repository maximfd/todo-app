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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n/* harmony import */ var _modules_ProjectsList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ProjectsList */ \"./src/modules/ProjectsList.js\");\n\r\n\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\nclass UI {\r\n    constructor() {\r\n        this.app = document.querySelector('#root')\r\n\r\n        this.sidebar = document.createElement('div')\r\n        this.sidebar.classList.add('sidebar')\r\n        this.sideTitle = document.createElement('h2')\r\n        this.sideTitle.textContent = 'Projects'\r\n        this.projectsList = document.createElement('ul')\r\n        this.projectsList.classList.add('projects-list')\r\n        this.sidebar.append(this.sideTitle, this.projectsList)\r\n\r\n        this.main = document.createElement('div')\r\n        this.main.classList.add('main')\r\n        this.mainTitle = document.createElement('h2')\r\n        this.mainTitle.textContent = 'Tasks'\r\n        this.tasksList = document.createElement('ul')\r\n        this.tasksList.classList.add('tasks-list')\r\n        this.main.append(this.mainTitle, this.tasksList)\r\n\r\n        this.app.append(this.sidebar, this.main)\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-app/./src/modules/UI.js?");

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