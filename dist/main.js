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
/* harmony export */   createBtn: () => (/* binding */ createBtn),
/* harmony export */   "default": () => (/* binding */ TodoDOM_Manager),
/* harmony export */   deleteBtn: () => (/* binding */ deleteBtn)
/* harmony export */ });
// Different progress Div
const contentDiv = document.querySelector(".content");
const defaultStateDiv = contentDiv.querySelector(".default");
const progressStateDiv = contentDiv.querySelector(".progress");
const finishStateDiv = contentDiv.querySelector(".finish");

// INPUTS Value creating Todo
const createTodo = document.querySelector(".createTodo");
const createBtn = createTodo.querySelector(".create");
const deleteBtn = createTodo.querySelector(".delete");
const titleInput = createTodo.querySelector("#title");
const descriptionInput = createTodo.querySelector("#describe");
const stateInput = createTodo.querySelector("#state");

class TodoDOM_Manager {
  constructor() {
    // empty
  }
  readInputValues_DOM() {
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

  createTodo(newTodo) {
    const id = this.generateID();
    newTodo.id = id;
    console.log(newTodo);
    // title, description, state
    // const newTodo = new Todo(title, description, state);
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

_DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__.createBtn.addEventListener("click", () => {
  // update data from DOM
  todoDOM_Manager.readInputValues_DOM();
  // get data from current DOM data
  const updatedDOM_Value = todoDOM_Manager.getInputValues_DOM();
  todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  // create todo and store
  todoManager.createTodo(updatedDOM_Value);
  // because use the same reference,it would add id property!
  // todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  todoManager.show();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDQTtBQUNQO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixJQUFJLFdBQVcsTUFBTTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDOUZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ21DOztBQUV6RSx3QkFBd0IsK0NBQVc7QUFDbkMsNEJBQTRCLHVEQUFlOztBQUUzQyxzREFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0Ly4vc3JjL0RPTS1tYW5pcHVsYXRlLmpzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0Ly4vc3JjL0xvZ2ljLmpzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGlmZmVyZW50IHByb2dyZXNzIERpdlxuY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbmNvbnN0IGRlZmF1bHRTdGF0ZURpdiA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0XCIpO1xuY29uc3QgcHJvZ3Jlc3NTdGF0ZURpdiA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKTtcbmNvbnN0IGZpbmlzaFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaFwiKTtcblxuLy8gSU5QVVRTIFZhbHVlIGNyZWF0aW5nIFRvZG9cbmNvbnN0IGNyZWF0ZVRvZG8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZVRvZG9cIik7XG5leHBvcnQgY29uc3QgY3JlYXRlQnRuID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiLmNyZWF0ZVwiKTtcbmV4cG9ydCBjb25zdCBkZWxldGVCdG4gPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIuZGVsZXRlXCIpO1xuY29uc3QgdGl0bGVJbnB1dCA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcbmNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpYmVcIik7XG5jb25zdCBzdGF0ZUlucHV0ID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiI3N0YXRlXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2RvRE9NX01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBlbXB0eVxuICB9XG4gIHJlYWRJbnB1dFZhbHVlc19ET00oKSB7XG4gICAgdGhpcy50aXRsZVZhbHVlID0gdGl0bGVJbnB1dC52YWx1ZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgIHRoaXMuc3RhdGVWYWx1ZSA9IHN0YXRlSW5wdXQudmFsdWU7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZXNfRE9NKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGhpcy50aXRsZVZhbHVlLFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb25WYWx1ZSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlVmFsdWUsXG4gICAgfTtcbiAgfVxuICBjcmVhdGVUb2RvX0RPTShvYmplY3QpIHtcbiAgICBjb25zdCB0b2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvYmplY3QpKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhgS2V5OiAke2tleX0sIFZhbHVlOiAke3ZhbHVlfWApO1xuICAgICAgY29uc3Qga2V5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGtleURpdi50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgdG9kby5hcHBlbmRDaGlsZChrZXlEaXYpO1xuICAgIH1cbiAgICB0aGlzLmFwcGVuZF9Ub2RvX1RvX1N0YXRlX0RPTSh0b2RvKTtcbiAgfVxuXG4gIC8vIHdvdWxkIG5vdCBuZWVkIHRvIGV4cG9ydFxuICBhcHBlbmRfVG9kb19Ub19TdGF0ZV9ET00odG9kbykge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZVZhbHVlKSB7XG4gICAgICBjYXNlIFwiZGVmYXVsdFwiOlxuICAgICAgICBkZWZhdWx0U3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2dyZXNzXCI6XG4gICAgICAgIHByb2dyZXNzU3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZpbmlzaFwiOlxuICAgICAgICBmaW5pc2hTdGF0ZURpdi5hcHBlbmRDaGlsZCh0b2RvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGUpIHtcbiAgICAodGhpcy5pZCA9IGlkKSxcbiAgICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLFxuICAgICAgKHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiksXG4gICAgICAodGhpcy5zdGF0ZSA9IHN0YXRlKTtcbiAgICAvLyAgICh0aGlzLmR1ZURhdGUgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5wcmlvcnRpdHkgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5ub3RlcyA9IFwidGVzdFwiKSxcbiAgICAvLyAgICh0aGlzLmNoZWNrbGlzdCA9IFwidGVzdFwiKTtcbiAgfVxuICB1cGRhdGVEZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuICB1cGRhdGVUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuICB1cGRhdGVTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG9kb01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZSA9IHtcbiAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgcHJvZ3Jlc3M6IFtdLFxuICAgICAgZmluaXNoOiBbXSxcbiAgICB9O1xuICAgIHRoaXMuZ2VuZXJhdGVkSURzID0gW107XG4gIH1cblxuICBjcmVhdGVUb2RvKG5ld1RvZG8pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRCgpO1xuICAgIG5ld1RvZG8uaWQgPSBpZDtcbiAgICBjb25zb2xlLmxvZyhuZXdUb2RvKTtcbiAgICAvLyB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlXG4gICAgLy8gY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGUpO1xuICAgIHRoaXMucHVzaFRvU2VsZWN0U3RhdGUobmV3VG9kbywgbmV3VG9kby5zdGF0ZSk7XG4gIH1cblxuICByZWFkVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgY29uc3QgdG9kbyA9IHRvZG9zSW5TdGF0ZS5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICBpZiAodG9kbykge1xuICAgICAgICBjb25zb2xlLmxvZyh0b2RvKTtcbiAgICAgICAgcmV0dXJuIHRvZG87IC8vIFJldHVybiB0aGUgdG9kbyBpZiBmb3VuZFxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFRvZG8gd2l0aCBzcGVjaWZpZWQgSUQgbm90IGZvdW5kIVwiKTtcbiAgICByZXR1cm4gbnVsbDsgLy8gUmV0dXJuIG51bGwgaWYgdG9kbyBub3QgZm91bmRcbiAgfVxuXG4gIGRlbGV0ZVRvZG9CeUlkKGlkKSB7XG4gICAgZm9yIChjb25zdCBzdGF0ZSBvZiBPYmplY3Qua2V5cyh0aGlzLnRvZG9fc3RvcmFnZSkpIHtcbiAgICAgIGNvbnN0IHRvZG9zSW5TdGF0ZSA9IHRoaXMudG9kb19zdG9yYWdlW3N0YXRlXTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9kb3NJblN0YXRlLmZpbmRJbmRleCgodG9kbykgPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0b2Rvc0luU3RhdGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcmV0dXJuOyAvLyBFeGl0IHRoZSBsb29wIG9uY2UgdGhlIHRvZG8gaXMgZGVsZXRlZFxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFRvZG8gd2l0aCBzcGVjaWZpZWQgSUQgbm90IGZvdW5kIVwiKTtcbiAgfVxuICB1cGRhdGVUb2RvKGlkLCBuZXdUb2RvKSB7XG4gICAgbGV0IG9yaWdpblRvZG8gPSB0aGlzLnJlYWRUb2RvQnlJZChpZCk7XG4gICAgLy8gbWF5IG5lZWQgdG8gdXNlIHVwZGF0ZSBmdW5jdGlvblxuICAgIE9iamVjdC5hc3NpZ24ob3JpZ2luVG9kbywgbmV3VG9kbyk7XG4gIH1cbiAgcHVzaFRvU2VsZWN0U3RhdGUodG9kbywgc3RhdGUpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV0ucHVzaCh0b2RvKTtcbiAgfVxuXG4gIGRlbGV0ZUlEKGlkKSB7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMuZmluZCgoRWxlbWVudCkgPT4gRWxlbWVudCA9PT0gaWQpO1xuICB9XG4gIGdlbmVyYXRlSUQoKSB7XG4gICAgbGV0IGlkO1xuICAgIGRvIHtcbiAgICAgIGlkID0gdGhpcy5nZW5lcmF0ZVNpbmdsZUlEKCk7XG4gICAgfSB3aGlsZSAodGhpcy5nZW5lcmF0ZWRJRHMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gaWQpKTtcbiAgICB0aGlzLmdlbmVyYXRlZElEcy5wdXNoKGlkKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgZ2VuZXJhdGVTaW5nbGVJRCgpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG4gICAgcmV0dXJuIHJhbmRvbTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy50b2RvX3N0b3JhZ2UpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ2VuZXJhdGVkSURzKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvTWFuYWdlciB9IGZyb20gXCIuL0xvZ2ljXCI7XG5pbXBvcnQgVG9kb0RPTV9NYW5hZ2VyLCB7IGNyZWF0ZUJ0biwgZGVsZXRlQnRuIH0gZnJvbSBcIi4vRE9NLW1hbmlwdWxhdGVcIjtcblxuY29uc3QgdG9kb01hbmFnZXIgPSBuZXcgVG9kb01hbmFnZXIoKTtcbmNvbnN0IHRvZG9ET01fTWFuYWdlciA9IG5ldyBUb2RvRE9NX01hbmFnZXIoKTtcblxuY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIHVwZGF0ZSBkYXRhIGZyb20gRE9NXG4gIHRvZG9ET01fTWFuYWdlci5yZWFkSW5wdXRWYWx1ZXNfRE9NKCk7XG4gIC8vIGdldCBkYXRhIGZyb20gY3VycmVudCBET00gZGF0YVxuICBjb25zdCB1cGRhdGVkRE9NX1ZhbHVlID0gdG9kb0RPTV9NYW5hZ2VyLmdldElucHV0VmFsdWVzX0RPTSgpO1xuICB0b2RvRE9NX01hbmFnZXIuY3JlYXRlVG9kb19ET00odXBkYXRlZERPTV9WYWx1ZSk7XG4gIC8vIGNyZWF0ZSB0b2RvIGFuZCBzdG9yZVxuICB0b2RvTWFuYWdlci5jcmVhdGVUb2RvKHVwZGF0ZWRET01fVmFsdWUpO1xuICAvLyBiZWNhdXNlIHVzZSB0aGUgc2FtZSByZWZlcmVuY2UsaXQgd291bGQgYWRkIGlkIHByb3BlcnR5IVxuICAvLyB0b2RvRE9NX01hbmFnZXIuY3JlYXRlVG9kb19ET00odXBkYXRlZERPTV9WYWx1ZSk7XG4gIHRvZG9NYW5hZ2VyLnNob3coKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9