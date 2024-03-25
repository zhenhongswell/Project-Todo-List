/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM-manipulate.js":
/*!*******************************!*\
  !*** ./src/DOM-manipulate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodoDOM_Manager)
/* harmony export */ });
// Different progress Div
const contentDiv = document.querySelector(".content");
const defaultStateDiv = contentDiv.querySelector(".default");
const progressStateDiv = contentDiv.querySelector(".progress");
const finishStateDiv = contentDiv.querySelector(".finish");

// INPUTS Value creating Todo
const createTodo = document.querySelector(".createTodo");
const titleInput = createTodo.querySelector("#title");
const descriptionInput = createTodo.querySelector("#describe");
const stateInput = createTodo.querySelector("#state");

class TodoDOM_Manager {
  constructor() {
    // maybe
    this.titleValue = titleInput.value;
    this.descriptionValue = descriptionInput.value;
    this.stateValue = stateInput.value;
  }
  updateInputValues_DOM() {
    this.titleValue = titleInput.value;
    this.descriptionValue = descriptionInput.value;
    this.stateValue = stateInput.value;
  }
  getInputValues_DOM() {
    return {
      title: this.titleValue,
      description: this.descriptionValue,
      state: this.stateValue,
    };
  }
  createTodo_DOM(object) {
    const todo = document.createElement("div");
    // object = {
    //   id: "1",
    //   title: "Updated Title",
    //   description: "Updated Description",
    //   state: "default",
    // };
    for (const [key, value] of Object.entries(object)) {
      // console.log(`Key: ${key}, Value: ${value}`);
      const keyDiv = document.createElement("div");
      keyDiv.textContent = value;
      todo.appendChild(keyDiv);
    }
    this.append_Todo_To_State_DOM(todo);
  }
  // would not need to export
  append_Todo_To_State_DOM(todo) {
    switch (this.stateValue) {
      case "default":
        defaultStateDiv.appendChild(todo);
        break;
      case "progress":
        progressStateDiv.appendChild(todo);
        break;
      case "finish":
        finishStateDiv.appendChild(todo);
        break;
    }
  }
}


/***/ }),

/***/ "./src/Logic.js":
/*!**********************!*\
  !*** ./src/Logic.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TodoManager: () => (/* binding */ TodoManager)
/* harmony export */ });
class Todo {
  constructor(id, title, description, state) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.state = state);
    //   (this.dueDate = "test"),
    //   (this.priortity = "test"),
    //   (this.notes = "test"),
    //   (this.checklist = "test");
  }
  updateDescription(description) {
    this.description = description;
  }
  updateTitle(title) {
    this.title = title;
  }
  updateState(state) {
    this.state = state;
  }
}

class TodoManager {
  constructor() {
    this.todo_storage = {
      default: [],
      progress: [],
      finish: [],
    };
    this.generatedIDs = [];
  }

  createTodo(id, title, description, state) {
    // const id = this.generateID();
    const newTodo = new Todo(id, title, description, state);
    this.pushToSelectState(newTodo, newTodo.state);
  }

  readTodoById(id) {
    for (const state of Object.keys(this.todo_storage)) {
      const todosInState = this.todo_storage[state];
      const todo = todosInState.find((todo) => todo.id === id);
      if (todo) {
        console.log(todo);
        return todo; // Return the todo if found
      }
    }
    console.error("Error: Todo with specified ID not found!");
    return null; // Return null if todo not found
  }

  deleteTodoById(id) {
    for (const state of Object.keys(this.todo_storage)) {
      const todosInState = this.todo_storage[state];
      const index = todosInState.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todosInState.splice(index, 1);
        return; // Exit the loop once the todo is deleted
      }
    }
    console.error("Error: Todo with specified ID not found!");
  }
  updateTodo(id, newTodo) {
    let originTodo = this.readTodoById(id);
    // may need to use update function
    Object.assign(originTodo, newTodo);
  }
  pushToSelectState(todo, state) {
    this.todo_storage[state].push(todo);
  }

  deleteID(id) {
    this.generatedIDs.find((Element) => Element === id);
  }
  generateID() {
    let id;
    do {
      id = this.generateSingleID();
    } while (this.generatedIDs.find((element) => element === id));
    this.generatedIDs.push(id);
    return id;
  }
  generateSingleID() {
    const random = Math.floor(Math.random() * 10000);
    return random;
  }

  show() {
    console.log(this.todo_storage);
    console.log(this.generatedIDs);
  }
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logic */ "./src/Logic.js");
/* harmony import */ var _DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM-manipulate */ "./src/DOM-manipulate.js");



const todoManager = new _Logic__WEBPACK_IMPORTED_MODULE_0__.TodoManager();
const todoDOM_Manager = new _DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__["default"]();

// todoManager.updateTodo("1", {
//   title: "Updated Title",
//   description: "Updated Description",
// });
todoManager.createTodo("1", "Title 1", "Description 1", "default");
todoDOM_Manager.updateInputValues_DOM();
todoManager.updateTodo("1", todoDOM_Manager.getInputValues_DOM());
todoDOM_Manager.createTodo_DOM(todoDOM_Manager.getInputValues_DOM());

todoManager.show();

console.log(todoDOM_Manager.getInputValues_DOM());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixJQUFJLFdBQVcsTUFBTTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDUzs7QUFFL0Msd0JBQXdCLCtDQUFXO0FBQ25DLDRCQUE0Qix1REFBZTs7QUFFM0M7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvRE9NLW1hbmlwdWxhdGUuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEaWZmZXJlbnQgcHJvZ3Jlc3MgRGl2XG5jb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuY29uc3QgZGVmYXVsdFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHRcIik7XG5jb25zdCBwcm9ncmVzc1N0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpO1xuY29uc3QgZmluaXNoU3RhdGVEaXYgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpO1xuXG4vLyBJTlBVVFMgVmFsdWUgY3JlYXRpbmcgVG9kb1xuY29uc3QgY3JlYXRlVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlVG9kb1wiKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5jb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaWJlXCIpO1xuY29uc3Qgc3RhdGVJbnB1dCA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIiNzdGF0ZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0RPTV9NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gbWF5YmVcbiAgICB0aGlzLnRpdGxlVmFsdWUgPSB0aXRsZUlucHV0LnZhbHVlO1xuICAgIHRoaXMuZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XG4gICAgdGhpcy5zdGF0ZVZhbHVlID0gc3RhdGVJbnB1dC52YWx1ZTtcbiAgfVxuICB1cGRhdGVJbnB1dFZhbHVlc19ET00oKSB7XG4gICAgdGhpcy50aXRsZVZhbHVlID0gdGl0bGVJbnB1dC52YWx1ZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgIHRoaXMuc3RhdGVWYWx1ZSA9IHN0YXRlSW5wdXQudmFsdWU7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZXNfRE9NKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZVZhbHVlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb25WYWx1ZSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlVmFsdWUsXG4gICAgfTtcbiAgfVxuICBjcmVhdGVUb2RvX0RPTShvYmplY3QpIHtcbiAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvLyBvYmplY3QgPSB7XG4gICAgLy8gICBpZDogXCIxXCIsXG4gICAgLy8gICB0aXRsZTogXCJVcGRhdGVkIFRpdGxlXCIsXG4gICAgLy8gICBkZXNjcmlwdGlvbjogXCJVcGRhdGVkIERlc2NyaXB0aW9uXCIsXG4gICAgLy8gICBzdGF0ZTogXCJkZWZhdWx0XCIsXG4gICAgLy8gfTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmplY3QpKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgS2V5OiAke2tleX0sIFZhbHVlOiAke3ZhbHVlfWApO1xuICAgICAgY29uc3Qga2V5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGtleURpdi50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgdG9kby5hcHBlbmRDaGlsZChrZXlEaXYpO1xuICAgIH1cbiAgICB0aGlzLmFwcGVuZF9Ub2RvX1RvX1N0YXRlX0RPTSh0b2RvKTtcbiAgfVxuICAvLyB3b3VsZCBub3QgbmVlZCB0byBleHBvcnRcbiAgYXBwZW5kX1RvZG9fVG9fU3RhdGVfRE9NKHRvZG8pIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGVWYWx1ZSkge1xuICAgICAgY2FzZSBcImRlZmF1bHRcIjpcbiAgICAgICAgZGVmYXVsdFN0YXRlRGl2LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxuICAgICAgICBwcm9ncmVzc1N0YXRlRGl2LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmaW5pc2hcIjpcbiAgICAgICAgZmluaXNoU3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKSB7XG4gICAgKHRoaXMuaWQgPSBpZCksXG4gICAgICAodGhpcy50aXRsZSA9IHRpdGxlKSxcbiAgICAgICh0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pLFxuICAgICAgKHRoaXMuc3RhdGUgPSBzdGF0ZSk7XG4gICAgLy8gICAodGhpcy5kdWVEYXRlID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMucHJpb3J0aXR5ID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMubm90ZXMgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5jaGVja2xpc3QgPSBcInRlc3RcIik7XG4gIH1cbiAgdXBkYXRlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgdXBkYXRlVGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cbiAgdXBkYXRlU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvZG9NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvX3N0b3JhZ2UgPSB7XG4gICAgICBkZWZhdWx0OiBbXSxcbiAgICAgIHByb2dyZXNzOiBbXSxcbiAgICAgIGZpbmlzaDogW10sXG4gICAgfTtcbiAgICB0aGlzLmdlbmVyYXRlZElEcyA9IFtdO1xuICB9XG5cbiAgY3JlYXRlVG9kbyhpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBzdGF0ZSkge1xuICAgIC8vIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKCk7XG4gICAgY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKTtcbiAgICB0aGlzLnB1c2hUb1NlbGVjdFN0YXRlKG5ld1RvZG8sIG5ld1RvZG8uc3RhdGUpO1xuICB9XG5cbiAgcmVhZFRvZG9CeUlkKGlkKSB7XG4gICAgZm9yIChjb25zdCBzdGF0ZSBvZiBPYmplY3Qua2V5cyh0aGlzLnRvZG9fc3RvcmFnZSkpIHtcbiAgICAgIGNvbnN0IHRvZG9zSW5TdGF0ZSA9IHRoaXMudG9kb19zdG9yYWdlW3N0YXRlXTtcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2Rvc0luU3RhdGUuZmluZCgodG9kbykgPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgaWYgKHRvZG8pIHtcbiAgICAgICAgY29uc29sZS5sb2codG9kbyk7XG4gICAgICAgIHJldHVybiB0b2RvOyAvLyBSZXR1cm4gdGhlIHRvZG8gaWYgZm91bmRcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBUb2RvIHdpdGggc3BlY2lmaWVkIElEIG5vdCBmb3VuZCFcIik7XG4gICAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRvZG8gbm90IGZvdW5kXG4gIH1cblxuICBkZWxldGVUb2RvQnlJZChpZCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGUgb2YgT2JqZWN0LmtleXModGhpcy50b2RvX3N0b3JhZ2UpKSB7XG4gICAgICBjb25zdCB0b2Rvc0luU3RhdGUgPSB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV07XG4gICAgICBjb25zdCBpbmRleCA9IHRvZG9zSW5TdGF0ZS5maW5kSW5kZXgoKHRvZG8pID0+IHRvZG8uaWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdG9kb3NJblN0YXRlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHJldHVybjsgLy8gRXhpdCB0aGUgbG9vcCBvbmNlIHRoZSB0b2RvIGlzIGRlbGV0ZWRcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBUb2RvIHdpdGggc3BlY2lmaWVkIElEIG5vdCBmb3VuZCFcIik7XG4gIH1cbiAgdXBkYXRlVG9kbyhpZCwgbmV3VG9kbykge1xuICAgIGxldCBvcmlnaW5Ub2RvID0gdGhpcy5yZWFkVG9kb0J5SWQoaWQpO1xuICAgIC8vIG1heSBuZWVkIHRvIHVzZSB1cGRhdGUgZnVuY3Rpb25cbiAgICBPYmplY3QuYXNzaWduKG9yaWdpblRvZG8sIG5ld1RvZG8pO1xuICB9XG4gIHB1c2hUb1NlbGVjdFN0YXRlKHRvZG8sIHN0YXRlKSB7XG4gICAgdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdLnB1c2godG9kbyk7XG4gIH1cblxuICBkZWxldGVJRChpZCkge1xuICAgIHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKEVsZW1lbnQpID0+IEVsZW1lbnQgPT09IGlkKTtcbiAgfVxuICBnZW5lcmF0ZUlEKCkge1xuICAgIGxldCBpZDtcbiAgICBkbyB7XG4gICAgICBpZCA9IHRoaXMuZ2VuZXJhdGVTaW5nbGVJRCgpO1xuICAgIH0gd2hpbGUgKHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IGlkKSk7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMucHVzaChpZCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGdlbmVyYXRlU2luZ2xlSUQoKSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICBzaG93KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb19zdG9yYWdlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdlbmVyYXRlZElEcyk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb01hbmFnZXIgfSBmcm9tIFwiLi9Mb2dpY1wiO1xuaW1wb3J0IFRvZG9ET01fTWFuYWdlciBmcm9tIFwiLi9ET00tbWFuaXB1bGF0ZVwiO1xuXG5jb25zdCB0b2RvTWFuYWdlciA9IG5ldyBUb2RvTWFuYWdlcigpO1xuY29uc3QgdG9kb0RPTV9NYW5hZ2VyID0gbmV3IFRvZG9ET01fTWFuYWdlcigpO1xuXG4vLyB0b2RvTWFuYWdlci51cGRhdGVUb2RvKFwiMVwiLCB7XG4vLyAgIHRpdGxlOiBcIlVwZGF0ZWQgVGl0bGVcIixcbi8vICAgZGVzY3JpcHRpb246IFwiVXBkYXRlZCBEZXNjcmlwdGlvblwiLFxuLy8gfSk7XG50b2RvTWFuYWdlci5jcmVhdGVUb2RvKFwiMVwiLCBcIlRpdGxlIDFcIiwgXCJEZXNjcmlwdGlvbiAxXCIsIFwiZGVmYXVsdFwiKTtcbnRvZG9ET01fTWFuYWdlci51cGRhdGVJbnB1dFZhbHVlc19ET00oKTtcbnRvZG9NYW5hZ2VyLnVwZGF0ZVRvZG8oXCIxXCIsIHRvZG9ET01fTWFuYWdlci5nZXRJbnB1dFZhbHVlc19ET00oKSk7XG50b2RvRE9NX01hbmFnZXIuY3JlYXRlVG9kb19ET00odG9kb0RPTV9NYW5hZ2VyLmdldElucHV0VmFsdWVzX0RPTSgpKTtcblxudG9kb01hbmFnZXIuc2hvdygpO1xuXG5jb25zb2xlLmxvZyh0b2RvRE9NX01hbmFnZXIuZ2V0SW5wdXRWYWx1ZXNfRE9NKCkpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9