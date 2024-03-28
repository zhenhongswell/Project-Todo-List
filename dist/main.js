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
      if (key === "id") {
        todo.setAttribute("data-id", value);
        const createdcheckbox = this.createSelectCheckBox(value);
        todo.appendChild(createdcheckbox);
        continue;
      }
      const keyDiv = document.createElement("div");
      keyDiv.textContent = value;
      todo.appendChild(keyDiv);
    }
    this.append_Todo_To_State_DOM(todo);
  }

  createSelectCheckBox(id) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("data-id", id);
    checkbox.setAttribute("selected", checkbox.checked);
    // this is a closure to get the id when invoking the eventListener
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        console.log(`${id} checked (Selected)!`);
        checkbox.setAttribute("selected", checkbox.checked);
      } else {
        console.log(`${id} unchecked (Unselected)!`);
        checkbox.setAttribute("selected", checkbox.checked);
      }
    });
    return checkbox;
  }
  collectTodoCheckboxIdsWithSelectionState() {
    // -state checkbox.checked value
    const SelectedTodoCheckBoxes = contentDiv.querySelectorAll(
      `input[type="checkbox"]`
    );
    const todoIds = {
      selected: [],
      unselected: [],
    };
    SelectedTodoCheckBoxes.forEach((SelectedTodoCheck) => {
      console.log(SelectedTodoCheck);
      const dataId = SelectedTodoCheck.getAttribute("data-id");
      const dataSelected = SelectedTodoCheck.getAttribute("selected");

      if (dataSelected === "true") {
        todoIds.selected.push(dataId);
      }
      if (dataSelected === "false") {
        todoIds.unselected.push(dataId);
      }
    });
    return todoIds;
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

  delete_Todo_by_Id_Array(id_array) {
    console.log(id_array);
    id_array.forEach((id) => {
      const todoThatNeedToBeDeleted = contentDiv.querySelector(
        `[data-id="${id}"]`
      );
      console.log(todoThatNeedToBeDeleted);
      todoThatNeedToBeDeleted.remove();
    });
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
    // use for delete
    this.selectedTodos = [];
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
        return todo; // Return the todo if found
      }
    }
    console.error("Error: Todo with specified ID not found!");
    return null; // Return null if todo not found
  }

  removeTodoById(id) {
    for (const state of Object.keys(this.todo_storage)) {
      const todosInState = this.todo_storage[state];
      //   console.log("removeTodoById", id);
      const index = todosInState.findIndex((todo) => {
        return todo.id === Number(id);
      });

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

  addSelectedTodo(id) {
    this.selectedTodos.push(id);
  }

  removeSelectedTodo(todoToRemove) {
    const index = this.selectedTodos.indexOf(todoToRemove); // Find the index of the element
    if (index !== -1) {
      // If the element exists in the array
      this.selectedTodos.splice(index, 1); // Remove the element from the array
    }
  }

  deleteGenerateID(id) {
    const index = this.generatedIDs.findIndex((element) => {
      console.log(element);
      return element === Number(id);
    });
    if (index !== -1) {
      this.generatedIDs.splice(index, 1);
    }
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

_DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__.deleteBtn.addEventListener("click", () => {
  // console.log(todoDOM_Manager.collectTodoCheckboxIdsWithSelectionState());
  const TodoCheckboxIdsWithSelectionState =
    todoDOM_Manager.collectTodoCheckboxIdsWithSelectionState();
  const TodoCheckboxIdsSelected = TodoCheckboxIdsWithSelectionState.selected;
  todoDOM_Manager.delete_Todo_by_Id_Array(TodoCheckboxIdsSelected);

  TodoCheckboxIdsSelected.forEach((id) => {
    console.log("Selected", id);
    todoManager.deleteGenerateID(id);
    todoManager.removeTodoById(id);
  });

  todoManager.show();
});



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmlwdWxhdGUuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEaWZmZXJlbnQgcHJvZ3Jlc3MgRGl2XG5jb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuY29uc3QgZGVmYXVsdFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHRcIik7XG5jb25zdCBwcm9ncmVzc1N0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpO1xuY29uc3QgZmluaXNoU3RhdGVEaXYgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpO1xuXG4vLyBJTlBVVFMgVmFsdWUgY3JlYXRpbmcgVG9kb1xuY29uc3QgY3JlYXRlVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlVG9kb1wiKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVCdG4gPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlXCIpO1xuZXhwb3J0IGNvbnN0IGRlbGV0ZUJ0biA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIi5kZWxldGVcIik7XG5jb25zdCB0aXRsZUlucHV0ID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xuY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIiNkZXNjcmliZVwiKTtcbmNvbnN0IHN0YXRlSW5wdXQgPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIjc3RhdGVcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG9ET01fTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIGVtcHR5XG4gIH1cbiAgcmVhZElucHV0VmFsdWVzX0RPTSgpIHtcbiAgICB0aGlzLnRpdGxlVmFsdWUgPSB0aXRsZUlucHV0LnZhbHVlO1xuICAgIHRoaXMuZGVzY3JpcHRpb25WYWx1ZSA9IGRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XG4gICAgdGhpcy5zdGF0ZVZhbHVlID0gc3RhdGVJbnB1dC52YWx1ZTtcbiAgfVxuICBnZXRJbnB1dFZhbHVlc19ET00oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlVmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVWYWx1ZSxcbiAgICB9O1xuICB9XG4gIGNyZWF0ZVRvZG9fRE9NKG9iamVjdCkge1xuICAgIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKG9iamVjdCkpIHtcbiAgICAgIGlmIChrZXkgPT09IFwiaWRcIikge1xuICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgdmFsdWUpO1xuICAgICAgICBjb25zdCBjcmVhdGVkY2hlY2tib3ggPSB0aGlzLmNyZWF0ZVNlbGVjdENoZWNrQm94KHZhbHVlKTtcbiAgICAgICAgdG9kby5hcHBlbmRDaGlsZChjcmVhdGVkY2hlY2tib3gpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGtleURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBrZXlEaXYudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIHRvZG8uYXBwZW5kQ2hpbGQoa2V5RGl2KTtcbiAgICB9XG4gICAgdGhpcy5hcHBlbmRfVG9kb19Ub19TdGF0ZV9ET00odG9kbyk7XG4gIH1cblxuICBjcmVhdGVTZWxlY3RDaGVja0JveChpZCkge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGNoZWNrYm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG4gICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCBpZCk7XG4gICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgY2hlY2tib3guY2hlY2tlZCk7XG4gICAgLy8gdGhpcyBpcyBhIGNsb3N1cmUgdG8gZ2V0IHRoZSBpZCB3aGVuIGludm9raW5nIHRoZSBldmVudExpc3RlbmVyXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICBpZiAoY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtpZH0gY2hlY2tlZCAoU2VsZWN0ZWQpIWApO1xuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBjaGVja2JveC5jaGVja2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2lkfSB1bmNoZWNrZWQgKFVuc2VsZWN0ZWQpIWApO1xuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBjaGVja2JveC5jaGVja2VkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY2hlY2tib3g7XG4gIH1cbiAgY29sbGVjdFRvZG9DaGVja2JveElkc1dpdGhTZWxlY3Rpb25TdGF0ZSgpIHtcbiAgICAvLyAtc3RhdGUgY2hlY2tib3guY2hlY2tlZCB2YWx1ZVxuICAgIGNvbnN0IFNlbGVjdGVkVG9kb0NoZWNrQm94ZXMgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdYFxuICAgICk7XG4gICAgY29uc3QgdG9kb0lkcyA9IHtcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICAgIHVuc2VsZWN0ZWQ6IFtdLFxuICAgIH07XG4gICAgU2VsZWN0ZWRUb2RvQ2hlY2tCb3hlcy5mb3JFYWNoKChTZWxlY3RlZFRvZG9DaGVjaykgPT4ge1xuICAgICAgY29uc29sZS5sb2coU2VsZWN0ZWRUb2RvQ2hlY2spO1xuICAgICAgY29uc3QgZGF0YUlkID0gU2VsZWN0ZWRUb2RvQ2hlY2suZ2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiKTtcbiAgICAgIGNvbnN0IGRhdGFTZWxlY3RlZCA9IFNlbGVjdGVkVG9kb0NoZWNrLmdldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIpO1xuXG4gICAgICBpZiAoZGF0YVNlbGVjdGVkID09PSBcInRydWVcIikge1xuICAgICAgICB0b2RvSWRzLnNlbGVjdGVkLnB1c2goZGF0YUlkKTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhU2VsZWN0ZWQgPT09IFwiZmFsc2VcIikge1xuICAgICAgICB0b2RvSWRzLnVuc2VsZWN0ZWQucHVzaChkYXRhSWQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0b2RvSWRzO1xuICB9XG4gIC8vIHdvdWxkIG5vdCBuZWVkIHRvIGV4cG9ydFxuICBhcHBlbmRfVG9kb19Ub19TdGF0ZV9ET00odG9kbykge1xuICAgIHN3aXRjaCAodGhpcy5zdGF0ZVZhbHVlKSB7XG4gICAgICBjYXNlIFwiZGVmYXVsdFwiOlxuICAgICAgICBkZWZhdWx0U3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInByb2dyZXNzXCI6XG4gICAgICAgIHByb2dyZXNzU3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZpbmlzaFwiOlxuICAgICAgICBmaW5pc2hTdGF0ZURpdi5hcHBlbmRDaGlsZCh0b2RvKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlX1RvZG9fYnlfSWRfQXJyYXkoaWRfYXJyYXkpIHtcbiAgICBjb25zb2xlLmxvZyhpZF9hcnJheSk7XG4gICAgaWRfYXJyYXkuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9UaGF0TmVlZFRvQmVEZWxldGVkID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtaWQ9XCIke2lkfVwiXWBcbiAgICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0b2RvVGhhdE5lZWRUb0JlRGVsZXRlZCk7XG4gICAgICB0b2RvVGhhdE5lZWRUb0JlRGVsZXRlZC5yZW1vdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKSB7XG4gICAgKHRoaXMuaWQgPSBpZCksXG4gICAgICAodGhpcy50aXRsZSA9IHRpdGxlKSxcbiAgICAgICh0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pLFxuICAgICAgKHRoaXMuc3RhdGUgPSBzdGF0ZSk7XG4gICAgLy8gICAodGhpcy5kdWVEYXRlID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMucHJpb3J0aXR5ID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMubm90ZXMgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5jaGVja2xpc3QgPSBcInRlc3RcIik7XG4gIH1cbiAgdXBkYXRlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgdXBkYXRlVGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cbiAgdXBkYXRlU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvZG9NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50b2RvX3N0b3JhZ2UgPSB7XG4gICAgICBkZWZhdWx0OiBbXSxcbiAgICAgIHByb2dyZXNzOiBbXSxcbiAgICAgIGZpbmlzaDogW10sXG4gICAgfTtcbiAgICAvLyB1c2UgZm9yIGRlbGV0ZVxuICAgIHRoaXMuc2VsZWN0ZWRUb2RvcyA9IFtdO1xuICAgIHRoaXMuZ2VuZXJhdGVkSURzID0gW107XG4gIH1cblxuICBjcmVhdGVUb2RvKG5ld1RvZG8pIHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2VuZXJhdGVJRCgpO1xuICAgIG5ld1RvZG8uaWQgPSBpZDtcbiAgICBjb25zb2xlLmxvZyhuZXdUb2RvKTtcbiAgICAvLyB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlXG4gICAgLy8gY29uc3QgbmV3VG9kbyA9IG5ldyBUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGUpO1xuICAgIHRoaXMucHVzaFRvU2VsZWN0U3RhdGUobmV3VG9kbywgbmV3VG9kby5zdGF0ZSk7XG4gIH1cblxuICByZWFkVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgY29uc3QgdG9kbyA9IHRvZG9zSW5TdGF0ZS5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICBpZiAodG9kbykge1xuICAgICAgICByZXR1cm4gdG9kbzsgLy8gUmV0dXJuIHRoZSB0b2RvIGlmIGZvdW5kXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0b2RvIG5vdCBmb3VuZFxuICB9XG5cbiAgcmVtb3ZlVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcInJlbW92ZVRvZG9CeUlkXCIsIGlkKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9kb3NJblN0YXRlLmZpbmRJbmRleCgodG9kbykgPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5pZCA9PT0gTnVtYmVyKGlkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRvZG9zSW5TdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgdGhlIGxvb3Agb25jZSB0aGUgdG9kbyBpcyBkZWxldGVkXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICB9XG4gIHVwZGF0ZVRvZG9CeUlkKGlkLCBuZXdUb2RvKSB7XG4gICAgbGV0IG9yaWdpblRvZG8gPSB0aGlzLnJlYWRUb2RvQnlJZChpZCk7XG4gICAgLy8gbWF5IG5lZWQgdG8gdXNlIHVwZGF0ZSBmdW5jdGlvblxuICAgIE9iamVjdC5hc3NpZ24ob3JpZ2luVG9kbywgbmV3VG9kbyk7XG4gIH1cbiAgcHVzaFRvU2VsZWN0U3RhdGUodG9kbywgc3RhdGUpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV0ucHVzaCh0b2RvKTtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkVG9kbyhpZCkge1xuICAgIHRoaXMuc2VsZWN0ZWRUb2Rvcy5wdXNoKGlkKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkVG9kbyh0b2RvVG9SZW1vdmUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRUb2Rvcy5pbmRleE9mKHRvZG9Ub1JlbW92ZSk7IC8vIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgZXhpc3RzIGluIHRoZSBhcnJheVxuICAgICAgdGhpcy5zZWxlY3RlZFRvZG9zLnNwbGljZShpbmRleCwgMSk7IC8vIFJlbW92ZSB0aGUgZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUdlbmVyYXRlSUQoaWQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2VuZXJhdGVkSURzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA9PT0gTnVtYmVyKGlkKTtcbiAgICB9KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlZElEcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuICBnZW5lcmF0ZUlEKCkge1xuICAgIGxldCBpZDtcbiAgICBkbyB7XG4gICAgICBpZCA9IHRoaXMuZ2VuZXJhdGVTaW5nbGVJRCgpO1xuICAgIH0gd2hpbGUgKHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IGlkKSk7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMucHVzaChpZCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGdlbmVyYXRlU2luZ2xlSUQoKSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICBzaG93KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb19zdG9yYWdlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdlbmVyYXRlZElEcyk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb01hbmFnZXIgfSBmcm9tIFwiLi9Mb2dpY1wiO1xuaW1wb3J0IFRvZG9ET01fTWFuYWdlciwgeyBjcmVhdGVCdG4sIGRlbGV0ZUJ0biB9IGZyb20gXCIuL0RPTS1tYW5pcHVsYXRlXCI7XG5cbmNvbnN0IHRvZG9NYW5hZ2VyID0gbmV3IFRvZG9NYW5hZ2VyKCk7XG5jb25zdCB0b2RvRE9NX01hbmFnZXIgPSBuZXcgVG9kb0RPTV9NYW5hZ2VyKCk7XG5cbmNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAvLyB1cGRhdGUgZGF0YSBmcm9tIERPTVxuICB0b2RvRE9NX01hbmFnZXIucmVhZElucHV0VmFsdWVzX0RPTSgpO1xuICAvLyBnZXQgZGF0YSBmcm9tIGN1cnJlbnQgRE9NIGRhdGFcbiAgY29uc3QgdXBkYXRlZERPTV9WYWx1ZSA9IHRvZG9ET01fTWFuYWdlci5nZXRJbnB1dFZhbHVlc19ET00oKTtcbiAgLy8gdG9kb0RPTV9NYW5hZ2VyLmNyZWF0ZVRvZG9fRE9NKHVwZGF0ZWRET01fVmFsdWUpO1xuICAvLyBjcmVhdGUgdG9kbyBhbmQgc3RvcmVcbiAgdG9kb01hbmFnZXIuY3JlYXRlVG9kbyh1cGRhdGVkRE9NX1ZhbHVlKTtcbiAgLy8gYmVjYXVzZSB1c2UgdGhlIHNhbWUgcmVmZXJlbmNlLGl0IHdvdWxkIGFkZCBpZCBwcm9wZXJ0eSFcbiAgdG9kb0RPTV9NYW5hZ2VyLmNyZWF0ZVRvZG9fRE9NKHVwZGF0ZWRET01fVmFsdWUpO1xuICB0b2RvTWFuYWdlci5zaG93KCk7XG59KTtcblxuZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKHRvZG9ET01fTWFuYWdlci5jb2xsZWN0VG9kb0NoZWNrYm94SWRzV2l0aFNlbGVjdGlvblN0YXRlKCkpO1xuICBjb25zdCBUb2RvQ2hlY2tib3hJZHNXaXRoU2VsZWN0aW9uU3RhdGUgPVxuICAgIHRvZG9ET01fTWFuYWdlci5jb2xsZWN0VG9kb0NoZWNrYm94SWRzV2l0aFNlbGVjdGlvblN0YXRlKCk7XG4gIGNvbnN0IFRvZG9DaGVja2JveElkc1NlbGVjdGVkID0gVG9kb0NoZWNrYm94SWRzV2l0aFNlbGVjdGlvblN0YXRlLnNlbGVjdGVkO1xuICB0b2RvRE9NX01hbmFnZXIuZGVsZXRlX1RvZG9fYnlfSWRfQXJyYXkoVG9kb0NoZWNrYm94SWRzU2VsZWN0ZWQpO1xuXG4gIFRvZG9DaGVja2JveElkc1NlbGVjdGVkLmZvckVhY2goKGlkKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJTZWxlY3RlZFwiLCBpZCk7XG4gICAgdG9kb01hbmFnZXIuZGVsZXRlR2VuZXJhdGVJRChpZCk7XG4gICAgdG9kb01hbmFnZXIucmVtb3ZlVG9kb0J5SWQoaWQpO1xuICB9KTtcblxuICB0b2RvTWFuYWdlci5zaG93KCk7XG59KTtcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=