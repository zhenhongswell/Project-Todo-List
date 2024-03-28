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
      // todo.classList.add(key);
      if (key === "id") {
        todo.setAttribute("id", value);
        // will not show at DOM
        // continue;
      }
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

  delete_Todo(todo) {}
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
    // use for delete
    this.selectedtodos = [];

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
  updateTodoById(id, newTodo) {
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
  // todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  // create todo and store
  todoManager.createTodo(updatedDOM_Value);
  // because use the same reference,it would add id property!
  todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  todoManager.show();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDQTtBQUNQO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixJQUFJLFdBQVcsTUFBTTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqR0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDbUM7O0FBRXpFLHdCQUF3QiwrQ0FBVztBQUNuQyw0QkFBNEIsdURBQWU7O0FBRTNDLHNEQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvRE9NLW1hbmlwdWxhdGUuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEaWZmZXJlbnQgcHJvZ3Jlc3MgRGl2XG5jb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuY29uc3QgZGVmYXVsdFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHRcIik7XG5jb25zdCBwcm9ncmVzc1N0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpO1xuY29uc3QgZmluaXNoU3RhdGVEaXYgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpO1xuXG4vLyBJTlBVVFMgVmFsdWUgY3JlYXRpbmcgVG9kb1xuY29uc3QgY3JlYXRlVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlVG9kb1wiKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVCdG4gPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlXCIpO1xuZXhwb3J0IGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIi5kZWxldGVcIik7XG5jb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIiNkZXNjcmliZVwiKTtcbmNvbnN0IHN0YXRlSW5wdXQgPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9ET01fTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGVtcHR5XG4gIH1cbiAgcmVhZElucHV0VmFsdWVzX0RPTSgpIHtcbiAgICB0aGlzLnRpdGxlVmFsdWUgPSB0aXRsZUlucHV0LnZhbHVlO1xuICAgIHRoaXMuZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XG4gICAgdGhpcy5zdGF0ZVZhbHVlID0gc3RhdGVJbnB1dC52YWx1ZTtcbiAgfVxuICBnZXRJbnB1dFZhbHVlc19ET00oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlVmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVWYWx1ZSxcbiAgICB9O1xuICB9XG4gIGNyZWF0ZVRvZG9fRE9NKG9iamVjdCkge1xuICAgIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBLZXk6ICR7a2V5fSwgVmFsdWU6ICR7dmFsdWV9YCk7XG4gICAgICAvLyB0b2RvLmNsYXNzTGlzdC5hZGQoa2V5KTtcbiAgICAgIGlmIChrZXkgPT09IFwiaWRcIikge1xuICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImlkXCIsIHZhbHVlKTtcbiAgICAgICAgLy8gd2lsbCBub3Qgc2hvdyBhdCBET01cbiAgICAgICAgLy8gY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBrZXlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAga2V5RGl2LnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICB0b2RvLmFwcGVuZENoaWxkKGtleURpdik7XG4gICAgfVxuICAgIHRoaXMuYXBwZW5kX1RvZG9fVG9fU3RhdGVfRE9NKHRvZG8pO1xuICB9XG5cbiAgLy8gd291bGQgbm90IG5lZWQgdG8gZXhwb3J0XG4gIGFwcGVuZF9Ub2RvX1RvX1N0YXRlX0RPTSh0b2RvKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0YXRlVmFsdWUpIHtcbiAgICAgIGNhc2UgXCJkZWZhdWx0XCI6XG4gICAgICAgIGRlZmF1bHRTdGF0ZURpdi5hcHBlbmRDaGlsZCh0b2RvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicHJvZ3Jlc3NcIjpcbiAgICAgICAgcHJvZ3Jlc3NTdGF0ZURpdi5hcHBlbmRDaGlsZCh0b2RvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZmluaXNoXCI6XG4gICAgICAgIGZpbmlzaFN0YXRlRGl2LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBkZWxldGVfVG9kbyh0b2RvKSB7fVxufVxuIiwiY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKSB7XG4gICAgKHRoaXMuaWQgPSBpZCksXG4gICAgICAodGhpcy50aXRsZSA9IHRpdGxlKSxcbiAgICAgICh0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pLFxuICAgICAgKHRoaXMuc3RhdGUgPSBzdGF0ZSk7XG4gICAgLy8gICAodGhpcy5kdWVEYXRlID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMucHJpb3J0aXR5ID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMubm90ZXMgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5jaGVja2xpc3QgPSBcInRlc3RcIik7XG4gIH1cbiAgdXBkYXRlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgdXBkYXRlVGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cbiAgdXBkYXRlU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvZG9NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvX3N0b3JhZ2UgPSB7XG4gICAgICBkZWZhdWx0OiBbXSxcbiAgICAgIHByb2dyZXNzOiBbXSxcbiAgICAgIGZpbmlzaDogW10sXG4gICAgfTtcbiAgICAvLyB1c2UgZm9yIGRlbGV0ZVxuICAgIHRoaXMuc2VsZWN0ZWR0b2RvcyA9IFtdO1xuXG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMgPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVRvZG8obmV3VG9kbykge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKCk7XG4gICAgbmV3VG9kby5pZCA9IGlkO1xuICAgIGNvbnNvbGUubG9nKG5ld1RvZG8pO1xuICAgIC8vIHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGVcbiAgICAvLyBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBzdGF0ZSk7XG4gICAgdGhpcy5wdXNoVG9TZWxlY3RTdGF0ZShuZXdUb2RvLCBuZXdUb2RvLnN0YXRlKTtcbiAgfVxuXG4gIHJlYWRUb2RvQnlJZChpZCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGUgb2YgT2JqZWN0LmtleXModGhpcy50b2RvX3N0b3JhZ2UpKSB7XG4gICAgICBjb25zdCB0b2Rvc0luU3RhdGUgPSB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV07XG4gICAgICBjb25zdCB0b2RvID0gdG9kb3NJblN0YXRlLmZpbmQoKHRvZG8pID0+IHRvZG8uaWQgPT09IGlkKTtcbiAgICAgIGlmICh0b2RvKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvZG8pO1xuICAgICAgICByZXR1cm4gdG9kbzsgLy8gUmV0dXJuIHRoZSB0b2RvIGlmIGZvdW5kXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0b2RvIG5vdCBmb3VuZFxuICB9XG5cbiAgZGVsZXRlVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgY29uc3QgaW5kZXggPSB0b2Rvc0luU3RhdGUuZmluZEluZGV4KCh0b2RvKSA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRvZG9zSW5TdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgdGhlIGxvb3Agb25jZSB0aGUgdG9kbyBpcyBkZWxldGVkXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICB9XG4gIHVwZGF0ZVRvZG9CeUlkKGlkLCBuZXdUb2RvKSB7XG4gICAgbGV0IG9yaWdpblRvZG8gPSB0aGlzLnJlYWRUb2RvQnlJZChpZCk7XG4gICAgLy8gbWF5IG5lZWQgdG8gdXNlIHVwZGF0ZSBmdW5jdGlvblxuICAgIE9iamVjdC5hc3NpZ24ob3JpZ2luVG9kbywgbmV3VG9kbyk7XG4gIH1cbiAgcHVzaFRvU2VsZWN0U3RhdGUodG9kbywgc3RhdGUpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV0ucHVzaCh0b2RvKTtcbiAgfVxuXG4gIGRlbGV0ZUlEKGlkKSB7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMuZmluZCgoRWxlbWVudCkgPT4gRWxlbWVudCA9PT0gaWQpO1xuICB9XG4gIGdlbmVyYXRlSUQoKSB7XG4gICAgbGV0IGlkO1xuICAgIGRvIHtcbiAgICAgIGlkID0gdGhpcy5nZW5lcmF0ZVNpbmdsZUlEKCk7XG4gICAgfSB3aGlsZSAodGhpcy5nZW5lcmF0ZWRJRHMuZmluZCgoZWxlbWVudCkgPT4gZWxlbWVudCA9PT0gaWQpKTtcbiAgICB0aGlzLmdlbmVyYXRlZElEcy5wdXNoKGlkKTtcbiAgICByZXR1cm4gaWQ7XG4gIH1cbiAgZ2VuZXJhdGVTaW5nbGVJRCgpIHtcbiAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMCk7XG4gICAgcmV0dXJuIHJhbmRvbTtcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgY29uc29sZS5sb2codGhpcy50b2RvX3N0b3JhZ2UpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ2VuZXJhdGVkSURzKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUb2RvTWFuYWdlciB9IGZyb20gXCIuL0xvZ2ljXCI7XG5pbXBvcnQgVG9kb0RPTV9NYW5hZ2VyLCB7IGNyZWF0ZUJ0biwgZGVsZXRlQnRuIH0gZnJvbSBcIi4vRE9NLW1hbmlwdWxhdGVcIjtcblxuY29uc3QgdG9kb01hbmFnZXIgPSBuZXcgVG9kb01hbmFnZXIoKTtcbmNvbnN0IHRvZG9ET01fTWFuYWdlciA9IG5ldyBUb2RvRE9NX01hbmFnZXIoKTtcblxuY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIHVwZGF0ZSBkYXRhIGZyb20gRE9NXG4gIHRvZG9ET01fTWFuYWdlci5yZWFkSW5wdXRWYWx1ZXNfRE9NKCk7XG4gIC8vIGdldCBkYXRhIGZyb20gY3VycmVudCBET00gZGF0YVxuICBjb25zdCB1cGRhdGVkRE9NX1ZhbHVlID0gdG9kb0RPTV9NYW5hZ2VyLmdldElucHV0VmFsdWVzX0RPTSgpO1xuICAvLyB0b2RvRE9NX01hbmFnZXIuY3JlYXRlVG9kb19ET00odXBkYXRlZERPTV9WYWx1ZSk7XG4gIC8vIGNyZWF0ZSB0b2RvIGFuZCBzdG9yZVxuICB0b2RvTWFuYWdlci5jcmVhdGVUb2RvKHVwZGF0ZWRET01fVmFsdWUpO1xuICAvLyBiZWNhdXNlIHVzZSB0aGUgc2FtZSByZWZlcmVuY2UsaXQgd291bGQgYWRkIGlkIHByb3BlcnR5IVxuICB0b2RvRE9NX01hbmFnZXIuY3JlYXRlVG9kb19ET00odXBkYXRlZERPTV9WYWx1ZSk7XG4gIHRvZG9NYW5hZ2VyLnNob3coKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9