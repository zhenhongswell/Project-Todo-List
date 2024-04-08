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
/* harmony export */   createButton: () => (/* binding */ createButton),
/* harmony export */   "default": () => (/* binding */ TodoDOM_Manager),
/* harmony export */   deleteButton: () => (/* binding */ deleteButton),
/* harmony export */   saveAllEditButton: () => (/* binding */ saveAllEditButton)
/* harmony export */ });
// Different progress Div
const contentDiv = document.querySelector(".content");
const defaultStateDiv = contentDiv.querySelector(".default");
const progressStateDiv = contentDiv.querySelector(".progress");
const finishStateDiv = contentDiv.querySelector(".finish");

// INPUTS Value creating Todo
const createTodo = document.querySelector(".createTodo");
const createButton = createTodo.querySelector(".create");
const deleteButton = document.querySelector(".delete");
const saveAllEditButton = document.querySelector(".saveAllEdit");
const titleInput = createTodo.querySelector("#title");
const descriptionInput = createTodo.querySelector("#describe");
const stateInput = createTodo.querySelector("#state");

class TodoDOM_Manager {
  constructor() {
    // empty
  }
  readInputValues_FromCreateTodoInputs() {
    this.titleValue = titleInput.value;
    this.descriptionValue = descriptionInput.value;
    this.stateValue = stateInput.value;
  }
  getInputValues_FromCreateTodoInputs() {
    return {
      title: this.titleValue,
      description: this.descriptionValue,
      state: this.stateValue,
    };
  }
  createTodo_DOM(object) {
    const todo = document.createElement("div");
    todo.classList.add("todo");
    for (const [key, value] of Object.entries(object)) {
      if (key === "id") {
        todo.setAttribute("data-id", value);
        const createdcheckbox = this.createSelectCheckBox(value);
        todo.appendChild(createdcheckbox);

        const createdSaveEditButton = this.createSaveEditButton(value);
        todo.appendChild(createdSaveEditButton);
        const createdEditButton = this.createEditButton(
          value,
          createdSaveEditButton
        );
        todo.appendChild(createdEditButton);

        continue;
      }
      const keyDiv = document.createElement("h5");
      keyDiv.textContent = key;
      const valueDiv = document.createElement("div");
      valueDiv.classList.add(key);
      valueDiv.textContent = value;
      todo.appendChild(keyDiv);
      todo.appendChild(valueDiv);
    }

    this.append_Todo_To_State_DOM(todo);
  }
  createEditButton(id, saveEditButton) {
    const button = document.createElement("button");
    button.id = "editButton";
    button.textContent = "Edit";
    button.addEventListener("click", () => {
      this.editTodoDOMById(id);
      saveEditButton.style.display = "inline";
    });
    return button;
  }
  createSaveEditButton(id) {
    const button = document.createElement("button");
    button.id = "saveEditButton";
    button.textContent = "SaveEdit";
    // will change to inline after Edit Button be Pressed
    button.style.display = "none";
    button.addEventListener("click", () => {
      this.saveEditTodoDOMById(id);
      button.style.display = "none";
    });
    return button;
  }
  saveEditTodoDOMById(id) {
    // saves users input data by replacing the existing <input> element
    // with an <div> element.
    const todoObject = this.getTodoDataById(id);
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const titleInput = todoElement.querySelector(".title");
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "title");
    titleDiv.textContent = todoObject.title;
    todoElement.replaceChild(titleDiv, titleInput);

    const descriptionInput = todoElement.querySelector(".description");
    const descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("class", "description");
    descriptionDiv.textContent = todoObject.description;
    todoElement.replaceChild(descriptionDiv, descriptionInput);

    const stateInput = todoElement.querySelector(".state");
    const stateDiv = document.createElement("div");
    stateDiv.setAttribute("class", "state");
    stateDiv.textContent = todoObject.state;
    todoElement.replaceChild(stateDiv, stateInput);
  }

  getTodoDataById(id) {
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const titleElement = todoElement.querySelector(".title");
    const titleValue =
      titleInput.value == undefined ? titleInput.textContent : titleInput.value;
    const descriptionElement = todoElement.querySelector(".description");
    const descriptionValue =
      descriptionElement.value == undefined
        ? descriptionElement.textContent
        : descriptionElement.value;
    const stateElement = todoElement.querySelector(".state");
    const stateValue =
      stateElement.value == undefined
        ? stateElement.textContent
        : stateElement.value;
    return {
      id: id,
      title: titleValue,
      description: descriptionValue,
      state: stateValue,
    };
  }

  editTodoDOMById(id) {
    // allows users to edit the text content by replacing the existing <div> element
    // with an <input> element.
    const todoElement = document.querySelector(`[data-id="${id}"]`);
    const titleDiv = todoElement.querySelector(".title");
    const titleInput = document.createElement("input");
    titleInput.setAttribute("class", "title");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("value", titleDiv.textContent);
    todoElement.replaceChild(titleInput, titleDiv);

    const descriptionDiv = todoElement.querySelector(".description");
    const descriptionInput = document.createElement("input");
    descriptionInput.setAttribute("class", "description");
    descriptionInput.setAttribute("type", "text");
    descriptionInput.setAttribute("value", descriptionDiv.textContent);
    todoElement.replaceChild(descriptionInput, descriptionDiv);

    const stateDiv = todoElement.querySelector(".state");
    const stateInput = document.createElement("input");
    stateInput.setAttribute("class", "state");
    stateInput.setAttribute("type", "text");
    stateInput.setAttribute("value", stateDiv.textContent);
    todoElement.replaceChild(stateInput, stateDiv);
  }

  createSelectCheckBox(id) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // checkbox.setAttribute("data-id", id);
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
      const dataId = SelectedTodoCheck.parentElement.getAttribute("data-id");
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
  getAllTodoData() {
    const allTodoDOMElement = contentDiv.querySelectorAll(`.todo`);
    const allTodoData = [];
    allTodoDOMElement.forEach((todo) => {
      const id = todo.getAttribute("data-id");
      const object = this.getTodoDataById(id);
      allTodoData.push(object);
    });
    return allTodoData;
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
      console.log(todosInState);
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
  updateTodo(id, newTodo) {
    // don't know why double click and print error message....
    let originTodo =
      this.readTodoById(Number(id)) == null
        ? this.readTodoById(String(id))
        : this.readTodoById(Number(id));
    // may need to use update function
    console.log(typeof id, id);
    console.log(originTodo, newTodo);
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

_DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__.createButton.addEventListener("click", () => {
  // update data from DOM
  todoDOM_Manager.readInputValues_FromCreateTodoInputs();
  // get data from current DOM data
  const updatedDOM_Value =
    todoDOM_Manager.getInputValues_FromCreateTodoInputs();
  // todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  // create todo and store
  todoManager.createTodo(updatedDOM_Value);
  // because use the same reference,it would add id property!
  todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  todoManager.show();
});

_DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__.deleteButton.addEventListener("click", () => {
  // DOM
  const TodoCheckboxIdsWithSelectionState =
    todoDOM_Manager.collectTodoCheckboxIdsWithSelectionState();
  const TodoCheckboxIdsSelected = TodoCheckboxIdsWithSelectionState.selected;
  todoDOM_Manager.delete_Todo_by_Id_Array(TodoCheckboxIdsSelected);
  // Logic
  TodoCheckboxIdsSelected.forEach((id) => {
    console.log("Selected", id);
    todoManager.deleteGenerateID(id);
    todoManager.removeTodoById(id);
  });
  todoManager.show();
});

_DOM_manipulate__WEBPACK_IMPORTED_MODULE_1__.saveAllEditButton.addEventListener("click", () => {
  const allTododata = todoDOM_Manager.getAllTodoData();
  allTododata.forEach((tododata) => {
    todoManager.updateTodo(tododata.id, tododata);
  });

  console.log(allTododata);

  todoManager.show();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDNUhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBS1o7O0FBRTFCLHdCQUF3QiwrQ0FBVztBQUNuQyw0QkFBNEIsdURBQWU7O0FBRTNDLHlEQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQseURBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLENBQUM7O0FBRUQsOERBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvRE9NLW1hbmlwdWxhdGUuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvTG9naWMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Byb2plY3QtdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9wcm9qZWN0LXRvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEaWZmZXJlbnQgcHJvZ3Jlc3MgRGl2XG5jb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250ZW50XCIpO1xuY29uc3QgZGVmYXVsdFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHRcIik7XG5jb25zdCBwcm9ncmVzc1N0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLnByb2dyZXNzXCIpO1xuY29uc3QgZmluaXNoU3RhdGVEaXYgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoXCIpO1xuXG4vLyBJTlBVVFMgVmFsdWUgY3JlYXRpbmcgVG9kb1xuY29uc3QgY3JlYXRlVG9kbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlVG9kb1wiKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVCdXR0b24gPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIuY3JlYXRlXCIpO1xuZXhwb3J0IGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVsZXRlXCIpO1xuZXhwb3J0IGNvbnN0IHNhdmVBbGxFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zYXZlQWxsRWRpdFwiKTtcbmNvbnN0IHRpdGxlSW5wdXQgPSBjcmVhdGVUb2RvLnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XG5jb25zdCBkZXNjcmlwdGlvbklucHV0ID0gY3JlYXRlVG9kby5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaWJlXCIpO1xuY29uc3Qgc3RhdGVJbnB1dCA9IGNyZWF0ZVRvZG8ucXVlcnlTZWxlY3RvcihcIiNzdGF0ZVwiKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kb0RPTV9NYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gZW1wdHlcbiAgfVxuICByZWFkSW5wdXRWYWx1ZXNfRnJvbUNyZWF0ZVRvZG9JbnB1dHMoKSB7XG4gICAgdGhpcy50aXRsZVZhbHVlID0gdGl0bGVJbnB1dC52YWx1ZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uVmFsdWUgPSBkZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgIHRoaXMuc3RhdGVWYWx1ZSA9IHN0YXRlSW5wdXQudmFsdWU7XG4gIH1cbiAgZ2V0SW5wdXRWYWx1ZXNfRnJvbUNyZWF0ZVRvZG9JbnB1dHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlVmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVWYWx1ZSxcbiAgICB9O1xuICB9XG4gIGNyZWF0ZVRvZG9fRE9NKG9iamVjdCkge1xuICAgIGNvbnN0IHRvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG8uY2xhc3NMaXN0LmFkZChcInRvZG9cIik7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqZWN0KSkge1xuICAgICAgaWYgKGtleSA9PT0gXCJpZFwiKSB7XG4gICAgICAgIHRvZG8uc2V0QXR0cmlidXRlKFwiZGF0YS1pZFwiLCB2YWx1ZSk7XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRjaGVja2JveCA9IHRoaXMuY3JlYXRlU2VsZWN0Q2hlY2tCb3godmFsdWUpO1xuICAgICAgICB0b2RvLmFwcGVuZENoaWxkKGNyZWF0ZWRjaGVja2JveCk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlZFNhdmVFZGl0QnV0dG9uID0gdGhpcy5jcmVhdGVTYXZlRWRpdEJ1dHRvbih2YWx1ZSk7XG4gICAgICAgIHRvZG8uYXBwZW5kQ2hpbGQoY3JlYXRlZFNhdmVFZGl0QnV0dG9uKTtcbiAgICAgICAgY29uc3QgY3JlYXRlZEVkaXRCdXR0b24gPSB0aGlzLmNyZWF0ZUVkaXRCdXR0b24oXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgY3JlYXRlZFNhdmVFZGl0QnV0dG9uXG4gICAgICAgICk7XG4gICAgICAgIHRvZG8uYXBwZW5kQ2hpbGQoY3JlYXRlZEVkaXRCdXR0b24pO1xuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3Qga2V5RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAga2V5RGl2LnRleHRDb250ZW50ID0ga2V5O1xuICAgICAgY29uc3QgdmFsdWVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdmFsdWVEaXYuY2xhc3NMaXN0LmFkZChrZXkpO1xuICAgICAgdmFsdWVEaXYudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIHRvZG8uYXBwZW5kQ2hpbGQoa2V5RGl2KTtcbiAgICAgIHRvZG8uYXBwZW5kQ2hpbGQodmFsdWVEaXYpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwZW5kX1RvZG9fVG9fU3RhdGVfRE9NKHRvZG8pO1xuICB9XG4gIGNyZWF0ZUVkaXRCdXR0b24oaWQsIHNhdmVFZGl0QnV0dG9uKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidXR0b24uaWQgPSBcImVkaXRCdXR0b25cIjtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIkVkaXRcIjtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMuZWRpdFRvZG9ET01CeUlkKGlkKTtcbiAgICAgIHNhdmVFZGl0QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuICAgIH0pO1xuICAgIHJldHVybiBidXR0b247XG4gIH1cbiAgY3JlYXRlU2F2ZUVkaXRCdXR0b24oaWQpIHtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ1dHRvbi5pZCA9IFwic2F2ZUVkaXRCdXR0b25cIjtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSBcIlNhdmVFZGl0XCI7XG4gICAgLy8gd2lsbCBjaGFuZ2UgdG8gaW5saW5lIGFmdGVyIEVkaXQgQnV0dG9uIGJlIFByZXNzZWRcbiAgICBidXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zYXZlRWRpdFRvZG9ET01CeUlkKGlkKTtcbiAgICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxuICBzYXZlRWRpdFRvZG9ET01CeUlkKGlkKSB7XG4gICAgLy8gc2F2ZXMgdXNlcnMgaW5wdXQgZGF0YSBieSByZXBsYWNpbmcgdGhlIGV4aXN0aW5nIDxpbnB1dD4gZWxlbWVudFxuICAgIC8vIHdpdGggYW4gPGRpdj4gZWxlbWVudC5cbiAgICBjb25zdCB0b2RvT2JqZWN0ID0gdGhpcy5nZXRUb2RvRGF0YUJ5SWQoaWQpO1xuICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSB0b2RvRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgIGNvbnN0IHRpdGxlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aXRsZURpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRpdGxlXCIpO1xuICAgIHRpdGxlRGl2LnRleHRDb250ZW50ID0gdG9kb09iamVjdC50aXRsZTtcbiAgICB0b2RvRWxlbWVudC5yZXBsYWNlQ2hpbGQodGl0bGVEaXYsIHRpdGxlSW5wdXQpO1xuXG4gICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IHRvZG9FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIik7XG4gICAgY29uc3QgZGVzY3JpcHRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRlc2NyaXB0aW9uRGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZGVzY3JpcHRpb25cIik7XG4gICAgZGVzY3JpcHRpb25EaXYudGV4dENvbnRlbnQgPSB0b2RvT2JqZWN0LmRlc2NyaXB0aW9uO1xuICAgIHRvZG9FbGVtZW50LnJlcGxhY2VDaGlsZChkZXNjcmlwdGlvbkRpdiwgZGVzY3JpcHRpb25JbnB1dCk7XG5cbiAgICBjb25zdCBzdGF0ZUlucHV0ID0gdG9kb0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGF0ZVwiKTtcbiAgICBjb25zdCBzdGF0ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3RhdGVEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJzdGF0ZVwiKTtcbiAgICBzdGF0ZURpdi50ZXh0Q29udGVudCA9IHRvZG9PYmplY3Quc3RhdGU7XG4gICAgdG9kb0VsZW1lbnQucmVwbGFjZUNoaWxkKHN0YXRlRGl2LCBzdGF0ZUlucHV0KTtcbiAgfVxuXG4gIGdldFRvZG9EYXRhQnlJZChpZCkge1xuICAgIGNvbnN0IHRvZG9FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApO1xuICAgIGNvbnN0IHRpdGxlRWxlbWVudCA9IHRvZG9FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGl0bGVcIik7XG4gICAgY29uc3QgdGl0bGVWYWx1ZSA9XG4gICAgICB0aXRsZUlucHV0LnZhbHVlID09IHVuZGVmaW5lZCA/IHRpdGxlSW5wdXQudGV4dENvbnRlbnQgOiB0aXRsZUlucHV0LnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uRWxlbWVudCA9IHRvZG9FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGVzY3JpcHRpb25cIik7XG4gICAgY29uc3QgZGVzY3JpcHRpb25WYWx1ZSA9XG4gICAgICBkZXNjcmlwdGlvbkVsZW1lbnQudmFsdWUgPT0gdW5kZWZpbmVkXG4gICAgICAgID8gZGVzY3JpcHRpb25FbGVtZW50LnRleHRDb250ZW50XG4gICAgICAgIDogZGVzY3JpcHRpb25FbGVtZW50LnZhbHVlO1xuICAgIGNvbnN0IHN0YXRlRWxlbWVudCA9IHRvZG9FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdGVcIik7XG4gICAgY29uc3Qgc3RhdGVWYWx1ZSA9XG4gICAgICBzdGF0ZUVsZW1lbnQudmFsdWUgPT0gdW5kZWZpbmVkXG4gICAgICAgID8gc3RhdGVFbGVtZW50LnRleHRDb250ZW50XG4gICAgICAgIDogc3RhdGVFbGVtZW50LnZhbHVlO1xuICAgIHJldHVybiB7XG4gICAgICBpZDogaWQsXG4gICAgICB0aXRsZTogdGl0bGVWYWx1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblZhbHVlLFxuICAgICAgc3RhdGU6IHN0YXRlVmFsdWUsXG4gICAgfTtcbiAgfVxuXG4gIGVkaXRUb2RvRE9NQnlJZChpZCkge1xuICAgIC8vIGFsbG93cyB1c2VycyB0byBlZGl0IHRoZSB0ZXh0IGNvbnRlbnQgYnkgcmVwbGFjaW5nIHRoZSBleGlzdGluZyA8ZGl2PiBlbGVtZW50XG4gICAgLy8gd2l0aCBhbiA8aW5wdXQ+IGVsZW1lbnQuXG4gICAgY29uc3QgdG9kb0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7aWR9XCJdYCk7XG4gICAgY29uc3QgdGl0bGVEaXYgPSB0b2RvRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpO1xuICAgIGNvbnN0IHRpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRpdGxlXCIpO1xuICAgIHRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgdGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCB0aXRsZURpdi50ZXh0Q29udGVudCk7XG4gICAgdG9kb0VsZW1lbnQucmVwbGFjZUNoaWxkKHRpdGxlSW5wdXQsIHRpdGxlRGl2KTtcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uRGl2ID0gdG9kb0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXNjcmlwdGlvblwiKTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbklucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJkZXNjcmlwdGlvblwiKTtcbiAgICBkZXNjcmlwdGlvbklucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgIGRlc2NyaXB0aW9uSW5wdXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgZGVzY3JpcHRpb25EaXYudGV4dENvbnRlbnQpO1xuICAgIHRvZG9FbGVtZW50LnJlcGxhY2VDaGlsZChkZXNjcmlwdGlvbklucHV0LCBkZXNjcmlwdGlvbkRpdik7XG5cbiAgICBjb25zdCBzdGF0ZURpdiA9IHRvZG9FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdGVcIik7XG4gICAgY29uc3Qgc3RhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzdGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwic3RhdGVcIik7XG4gICAgc3RhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICBzdGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHN0YXRlRGl2LnRleHRDb250ZW50KTtcbiAgICB0b2RvRWxlbWVudC5yZXBsYWNlQ2hpbGQoc3RhdGVJbnB1dCwgc3RhdGVEaXYpO1xuICB9XG5cbiAgY3JlYXRlU2VsZWN0Q2hlY2tCb3goaWQpIHtcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgIC8vIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcImRhdGEtaWRcIiwgaWQpO1xuICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIGNoZWNrYm94LmNoZWNrZWQpO1xuICAgIC8vIHRoaXMgaXMgYSBjbG9zdXJlIHRvIGdldCB0aGUgaWQgd2hlbiBpbnZva2luZyB0aGUgZXZlbnRMaXN0ZW5lclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aWR9IGNoZWNrZWQgKFNlbGVjdGVkKSFgKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgY2hlY2tib3guY2hlY2tlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHtpZH0gdW5jaGVja2VkIChVbnNlbGVjdGVkKSFgKTtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIiwgY2hlY2tib3guY2hlY2tlZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNoZWNrYm94O1xuICB9XG5cbiAgY29sbGVjdFRvZG9DaGVja2JveElkc1dpdGhTZWxlY3Rpb25TdGF0ZSgpIHtcbiAgICAvLyAtc3RhdGUgY2hlY2tib3guY2hlY2tlZCB2YWx1ZVxuICAgIGNvbnN0IFNlbGVjdGVkVG9kb0NoZWNrQm94ZXMgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdYFxuICAgICk7XG4gICAgY29uc3QgdG9kb0lkcyA9IHtcbiAgICAgIHNlbGVjdGVkOiBbXSxcbiAgICAgIHVuc2VsZWN0ZWQ6IFtdLFxuICAgIH07XG4gICAgU2VsZWN0ZWRUb2RvQ2hlY2tCb3hlcy5mb3JFYWNoKChTZWxlY3RlZFRvZG9DaGVjaykgPT4ge1xuICAgICAgY29uc29sZS5sb2coU2VsZWN0ZWRUb2RvQ2hlY2spO1xuICAgICAgY29uc3QgZGF0YUlkID0gU2VsZWN0ZWRUb2RvQ2hlY2sucGFyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgY29uc3QgZGF0YVNlbGVjdGVkID0gU2VsZWN0ZWRUb2RvQ2hlY2suZ2V0QXR0cmlidXRlKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgIGlmIChkYXRhU2VsZWN0ZWQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIHRvZG9JZHMuc2VsZWN0ZWQucHVzaChkYXRhSWQpO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGFTZWxlY3RlZCA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIHRvZG9JZHMudW5zZWxlY3RlZC5wdXNoKGRhdGFJZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvZG9JZHM7XG4gIH1cblxuICAvLyB3b3VsZCBub3QgbmVlZCB0byBleHBvcnRcbiAgYXBwZW5kX1RvZG9fVG9fU3RhdGVfRE9NKHRvZG8pIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RhdGVWYWx1ZSkge1xuICAgICAgY2FzZSBcImRlZmF1bHRcIjpcbiAgICAgICAgZGVmYXVsdFN0YXRlRGl2LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxuICAgICAgICBwcm9ncmVzc1N0YXRlRGl2LmFwcGVuZENoaWxkKHRvZG8pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmaW5pc2hcIjpcbiAgICAgICAgZmluaXNoU3RhdGVEaXYuYXBwZW5kQ2hpbGQodG9kbyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBnZXRBbGxUb2RvRGF0YSgpIHtcbiAgICBjb25zdCBhbGxUb2RvRE9NRWxlbWVudCA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvckFsbChgLnRvZG9gKTtcbiAgICBjb25zdCBhbGxUb2RvRGF0YSA9IFtdO1xuICAgIGFsbFRvZG9ET01FbGVtZW50LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIGNvbnN0IGlkID0gdG9kby5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5nZXRUb2RvRGF0YUJ5SWQoaWQpO1xuICAgICAgYWxsVG9kb0RhdGEucHVzaChvYmplY3QpO1xuICAgIH0pO1xuICAgIHJldHVybiBhbGxUb2RvRGF0YTtcbiAgfVxuICBkZWxldGVfVG9kb19ieV9JZF9BcnJheShpZF9hcnJheSkge1xuICAgIGNvbnNvbGUubG9nKGlkX2FycmF5KTtcbiAgICBpZF9hcnJheS5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgY29uc3QgdG9kb1RoYXROZWVkVG9CZURlbGV0ZWQgPSBjb250ZW50RGl2LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGBbZGF0YS1pZD1cIiR7aWR9XCJdYFxuICAgICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKHRvZG9UaGF0TmVlZFRvQmVEZWxldGVkKTtcbiAgICAgIHRvZG9UaGF0TmVlZFRvQmVEZWxldGVkLnJlbW92ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJjbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IoaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGUpIHtcbiAgICAodGhpcy5pZCA9IGlkKSxcbiAgICAgICh0aGlzLnRpdGxlID0gdGl0bGUpLFxuICAgICAgKHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbiksXG4gICAgICAodGhpcy5zdGF0ZSA9IHN0YXRlKTtcbiAgICAvLyAgICh0aGlzLmR1ZURhdGUgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5wcmlvcnRpdHkgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5ub3RlcyA9IFwidGVzdFwiKSxcbiAgICAvLyAgICh0aGlzLmNoZWNrbGlzdCA9IFwidGVzdFwiKTtcbiAgfVxuICB1cGRhdGVEZXNjcmlwdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgfVxuICB1cGRhdGVUaXRsZSh0aXRsZSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuICB1cGRhdGVTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG9kb01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZSA9IHtcbiAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgcHJvZ3Jlc3M6IFtdLFxuICAgICAgZmluaXNoOiBbXSxcbiAgICB9O1xuICAgIC8vIHVzZSBmb3IgZGVsZXRlXG4gICAgdGhpcy5zZWxlY3RlZFRvZG9zID0gW107XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMgPSBbXTtcbiAgfVxuXG4gIGNyZWF0ZVRvZG8obmV3VG9kbykge1xuICAgIGNvbnN0IGlkID0gdGhpcy5nZW5lcmF0ZUlEKCk7XG4gICAgbmV3VG9kby5pZCA9IGlkO1xuICAgIGNvbnNvbGUubG9nKG5ld1RvZG8pO1xuICAgIC8vIHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGVcbiAgICAvLyBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBzdGF0ZSk7XG4gICAgdGhpcy5wdXNoVG9TZWxlY3RTdGF0ZShuZXdUb2RvLCBuZXdUb2RvLnN0YXRlKTtcbiAgfVxuXG4gIHJlYWRUb2RvQnlJZChpZCkge1xuICAgIGZvciAoY29uc3Qgc3RhdGUgb2YgT2JqZWN0LmtleXModGhpcy50b2RvX3N0b3JhZ2UpKSB7XG4gICAgICBjb25zdCB0b2Rvc0luU3RhdGUgPSB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV07XG4gICAgICBjb25zb2xlLmxvZyh0b2Rvc0luU3RhdGUpO1xuICAgICAgY29uc3QgdG9kbyA9IHRvZG9zSW5TdGF0ZS5maW5kKCh0b2RvKSA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICBpZiAodG9kbykge1xuICAgICAgICByZXR1cm4gdG9kbzsgLy8gUmV0dXJuIHRoZSB0b2RvIGlmIGZvdW5kXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICAgIHJldHVybiBudWxsOyAvLyBSZXR1cm4gbnVsbCBpZiB0b2RvIG5vdCBmb3VuZFxuICB9XG5cbiAgcmVtb3ZlVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgLy8gICBjb25zb2xlLmxvZyhcInJlbW92ZVRvZG9CeUlkXCIsIGlkKTtcbiAgICAgIGNvbnN0IGluZGV4ID0gdG9kb3NJblN0YXRlLmZpbmRJbmRleCgodG9kbykgPT4ge1xuICAgICAgICByZXR1cm4gdG9kby5pZCA9PT0gTnVtYmVyKGlkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRvZG9zSW5TdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgdGhlIGxvb3Agb25jZSB0aGUgdG9kbyBpcyBkZWxldGVkXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICB9XG4gIHVwZGF0ZVRvZG8oaWQsIG5ld1RvZG8pIHtcbiAgICAvLyBkb24ndCBrbm93IHdoeSBkb3VibGUgY2xpY2sgYW5kIHByaW50IGVycm9yIG1lc3NhZ2UuLi4uXG4gICAgbGV0IG9yaWdpblRvZG8gPVxuICAgICAgdGhpcy5yZWFkVG9kb0J5SWQoTnVtYmVyKGlkKSkgPT0gbnVsbFxuICAgICAgICA/IHRoaXMucmVhZFRvZG9CeUlkKFN0cmluZyhpZCkpXG4gICAgICAgIDogdGhpcy5yZWFkVG9kb0J5SWQoTnVtYmVyKGlkKSk7XG4gICAgLy8gbWF5IG5lZWQgdG8gdXNlIHVwZGF0ZSBmdW5jdGlvblxuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBpZCwgaWQpO1xuICAgIGNvbnNvbGUubG9nKG9yaWdpblRvZG8sIG5ld1RvZG8pO1xuICAgIE9iamVjdC5hc3NpZ24ob3JpZ2luVG9kbywgbmV3VG9kbyk7XG4gIH1cbiAgcHVzaFRvU2VsZWN0U3RhdGUodG9kbywgc3RhdGUpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZVtzdGF0ZV0ucHVzaCh0b2RvKTtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkVG9kbyhpZCkge1xuICAgIHRoaXMuc2VsZWN0ZWRUb2Rvcy5wdXNoKGlkKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkVG9kbyh0b2RvVG9SZW1vdmUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2VsZWN0ZWRUb2Rvcy5pbmRleE9mKHRvZG9Ub1JlbW92ZSk7IC8vIEZpbmQgdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgZXhpc3RzIGluIHRoZSBhcnJheVxuICAgICAgdGhpcy5zZWxlY3RlZFRvZG9zLnNwbGljZShpbmRleCwgMSk7IC8vIFJlbW92ZSB0aGUgZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUdlbmVyYXRlSUQoaWQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2VuZXJhdGVkSURzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICByZXR1cm4gZWxlbWVudCA9PT0gTnVtYmVyKGlkKTtcbiAgICB9KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmdlbmVyYXRlZElEcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuICBnZW5lcmF0ZUlEKCkge1xuICAgIGxldCBpZDtcbiAgICBkbyB7XG4gICAgICBpZCA9IHRoaXMuZ2VuZXJhdGVTaW5nbGVJRCgpO1xuICAgIH0gd2hpbGUgKHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IGlkKSk7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMucHVzaChpZCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGdlbmVyYXRlU2luZ2xlSUQoKSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICBzaG93KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb19zdG9yYWdlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdlbmVyYXRlZElEcyk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVG9kb01hbmFnZXIgfSBmcm9tIFwiLi9Mb2dpY1wiO1xuaW1wb3J0IFRvZG9ET01fTWFuYWdlciwge1xuICBjcmVhdGVCdXR0b24sXG4gIGRlbGV0ZUJ1dHRvbixcbiAgc2F2ZUFsbEVkaXRCdXR0b24sXG59IGZyb20gXCIuL0RPTS1tYW5pcHVsYXRlXCI7XG5cbmNvbnN0IHRvZG9NYW5hZ2VyID0gbmV3IFRvZG9NYW5hZ2VyKCk7XG5jb25zdCB0b2RvRE9NX01hbmFnZXIgPSBuZXcgVG9kb0RPTV9NYW5hZ2VyKCk7XG5cbmNyZWF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAvLyB1cGRhdGUgZGF0YSBmcm9tIERPTVxuICB0b2RvRE9NX01hbmFnZXIucmVhZElucHV0VmFsdWVzX0Zyb21DcmVhdGVUb2RvSW5wdXRzKCk7XG4gIC8vIGdldCBkYXRhIGZyb20gY3VycmVudCBET00gZGF0YVxuICBjb25zdCB1cGRhdGVkRE9NX1ZhbHVlID1cbiAgICB0b2RvRE9NX01hbmFnZXIuZ2V0SW5wdXRWYWx1ZXNfRnJvbUNyZWF0ZVRvZG9JbnB1dHMoKTtcbiAgLy8gdG9kb0RPTV9NYW5hZ2VyLmNyZWF0ZVRvZG9fRE9NKHVwZGF0ZWRET01fVmFsdWUpO1xuICAvLyBjcmVhdGUgdG9kbyBhbmQgc3RvcmVcbiAgdG9kb01hbmFnZXIuY3JlYXRlVG9kbyh1cGRhdGVkRE9NX1ZhbHVlKTtcbiAgLy8gYmVjYXVzZSB1c2UgdGhlIHNhbWUgcmVmZXJlbmNlLGl0IHdvdWxkIGFkZCBpZCBwcm9wZXJ0eSFcbiAgdG9kb0RPTV9NYW5hZ2VyLmNyZWF0ZVRvZG9fRE9NKHVwZGF0ZWRET01fVmFsdWUpO1xuICB0b2RvTWFuYWdlci5zaG93KCk7XG59KTtcblxuZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIC8vIERPTVxuICBjb25zdCBUb2RvQ2hlY2tib3hJZHNXaXRoU2VsZWN0aW9uU3RhdGUgPVxuICAgIHRvZG9ET01fTWFuYWdlci5jb2xsZWN0VG9kb0NoZWNrYm94SWRzV2l0aFNlbGVjdGlvblN0YXRlKCk7XG4gIGNvbnN0IFRvZG9DaGVja2JveElkc1NlbGVjdGVkID0gVG9kb0NoZWNrYm94SWRzV2l0aFNlbGVjdGlvblN0YXRlLnNlbGVjdGVkO1xuICB0b2RvRE9NX01hbmFnZXIuZGVsZXRlX1RvZG9fYnlfSWRfQXJyYXkoVG9kb0NoZWNrYm94SWRzU2VsZWN0ZWQpO1xuICAvLyBMb2dpY1xuICBUb2RvQ2hlY2tib3hJZHNTZWxlY3RlZC5mb3JFYWNoKChpZCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWRcIiwgaWQpO1xuICAgIHRvZG9NYW5hZ2VyLmRlbGV0ZUdlbmVyYXRlSUQoaWQpO1xuICAgIHRvZG9NYW5hZ2VyLnJlbW92ZVRvZG9CeUlkKGlkKTtcbiAgfSk7XG4gIHRvZG9NYW5hZ2VyLnNob3coKTtcbn0pO1xuXG5zYXZlQWxsRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zdCBhbGxUb2RvZGF0YSA9IHRvZG9ET01fTWFuYWdlci5nZXRBbGxUb2RvRGF0YSgpO1xuICBhbGxUb2RvZGF0YS5mb3JFYWNoKCh0b2RvZGF0YSkgPT4ge1xuICAgIHRvZG9NYW5hZ2VyLnVwZGF0ZVRvZG8odG9kb2RhdGEuaWQsIHRvZG9kYXRhKTtcbiAgfSk7XG5cbiAgY29uc29sZS5sb2coYWxsVG9kb2RhdGEpO1xuXG4gIHRvZG9NYW5hZ2VyLnNob3coKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9