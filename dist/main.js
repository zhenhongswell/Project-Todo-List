/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// const contentDiv = document.querySelector(".content");
// const defaultStateDiv = contentDiv.querySelector(".default");
// const progressStateDiv = contentDiv.querySelector(".progress");
// const finishStateDiv = contentDiv.querySelector(".finish");

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

const todoManager = new TodoManager();
// todoManager.createTodo("test", "123", "default");
// todoManager.createTodo("test", "123", "progress");
todoManager.createTodo("1", "Title 1", "Description 1", "default");
todoManager.updateTodo("1", {
  title: "Updated Title",
  description: "Updated Description",
});
// todoManager.generateID();
// todoManager.deleteTodoById("2");
// todoManager.readTodoById("1");

todoManager.show();

// function CreateTodoDOM(Newtodo) {
//   const NewtodoDiv = document.createElement("div");
//   NewtodoDiv.textContent = Newtodo.title;
//   const NewtodoDivDescribe = document.createElement("p");
//   NewtodoDivDescribe.textContent = Newtodo.description;
//   NewtodoDiv.appendChild(NewtodoDivDescribe);
//   //   adding button to NewtodoDiv
//   appendChildtoStateDiv(NewtodoDiv, Newtodo.state);
// }

// function appendChildtoStateDiv(Child, State) {
//   switch (State) {
//     case "default":
//       defaultStateDiv.appendChild(Child);
//       break;
//     case "progress":
//       progressStateDiv.appendChild(Child);
//       break;
//     case "finish":
//       finishStateDiv.appendChild(Child);
//       break;
//     default:
//       console.log("error:none State available!");
//   }
// }

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gY29uc3QgY29udGVudERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudFwiKTtcbi8vIGNvbnN0IGRlZmF1bHRTdGF0ZURpdiA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvcihcIi5kZWZhdWx0XCIpO1xuLy8gY29uc3QgcHJvZ3Jlc3NTdGF0ZURpdiA9IGNvbnRlbnREaXYucXVlcnlTZWxlY3RvcihcIi5wcm9ncmVzc1wiKTtcbi8vIGNvbnN0IGZpbmlzaFN0YXRlRGl2ID0gY29udGVudERpdi5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaFwiKTtcblxuY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKSB7XG4gICAgKHRoaXMuaWQgPSBpZCksXG4gICAgICAodGhpcy50aXRsZSA9IHRpdGxlKSxcbiAgICAgICh0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24pLFxuICAgICAgKHRoaXMuc3RhdGUgPSBzdGF0ZSk7XG4gICAgLy8gICAodGhpcy5kdWVEYXRlID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMucHJpb3J0aXR5ID0gXCJ0ZXN0XCIpLFxuICAgIC8vICAgKHRoaXMubm90ZXMgPSBcInRlc3RcIiksXG4gICAgLy8gICAodGhpcy5jaGVja2xpc3QgPSBcInRlc3RcIik7XG4gIH1cbiAgdXBkYXRlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gIH1cbiAgdXBkYXRlVGl0bGUodGl0bGUpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gIH1cbiAgdXBkYXRlU3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gIH1cbn1cblxuY2xhc3MgVG9kb01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRvZG9fc3RvcmFnZSA9IHtcbiAgICAgIGRlZmF1bHQ6IFtdLFxuICAgICAgcHJvZ3Jlc3M6IFtdLFxuICAgICAgZmluaXNoOiBbXSxcbiAgICB9O1xuICAgIHRoaXMuZ2VuZXJhdGVkSURzID0gW107XG4gIH1cblxuICBjcmVhdGVUb2RvKGlkLCB0aXRsZSwgZGVzY3JpcHRpb24sIHN0YXRlKSB7XG4gICAgLy8gY29uc3QgaWQgPSB0aGlzLmdlbmVyYXRlSUQoKTtcbiAgICBjb25zdCBuZXdUb2RvID0gbmV3IFRvZG8oaWQsIHRpdGxlLCBkZXNjcmlwdGlvbiwgc3RhdGUpO1xuICAgIHRoaXMucHVzaFRvU2VsZWN0U3RhdGUobmV3VG9kbywgbmV3VG9kby5zdGF0ZSk7XG4gIH1cbiAgcmVhZFRvZG9CeUlkKGlkKSB7XG4gICAgZm9yIChjb25zdCBzdGF0ZSBvZiBPYmplY3Qua2V5cyh0aGlzLnRvZG9fc3RvcmFnZSkpIHtcbiAgICAgIGNvbnN0IHRvZG9zSW5TdGF0ZSA9IHRoaXMudG9kb19zdG9yYWdlW3N0YXRlXTtcbiAgICAgIGNvbnN0IHRvZG8gPSB0b2Rvc0luU3RhdGUuZmluZCgodG9kbykgPT4gdG9kby5pZCA9PT0gaWQpO1xuICAgICAgaWYgKHRvZG8pIHtcbiAgICAgICAgY29uc29sZS5sb2codG9kbyk7XG4gICAgICAgIHJldHVybiB0b2RvOyAvLyBSZXR1cm4gdGhlIHRvZG8gaWYgZm91bmRcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yOiBUb2RvIHdpdGggc3BlY2lmaWVkIElEIG5vdCBmb3VuZCFcIik7XG4gICAgcmV0dXJuIG51bGw7IC8vIFJldHVybiBudWxsIGlmIHRvZG8gbm90IGZvdW5kXG4gIH1cbiAgZGVsZXRlVG9kb0J5SWQoaWQpIHtcbiAgICBmb3IgKGNvbnN0IHN0YXRlIG9mIE9iamVjdC5rZXlzKHRoaXMudG9kb19zdG9yYWdlKSkge1xuICAgICAgY29uc3QgdG9kb3NJblN0YXRlID0gdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdO1xuICAgICAgY29uc3QgaW5kZXggPSB0b2Rvc0luU3RhdGUuZmluZEluZGV4KCh0b2RvKSA9PiB0b2RvLmlkID09PSBpZCk7XG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgIHRvZG9zSW5TdGF0ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICByZXR1cm47IC8vIEV4aXQgdGhlIGxvb3Agb25jZSB0aGUgdG9kbyBpcyBkZWxldGVkXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjogVG9kbyB3aXRoIHNwZWNpZmllZCBJRCBub3QgZm91bmQhXCIpO1xuICB9XG4gIHVwZGF0ZVRvZG8oaWQsIG5ld1RvZG8pIHtcbiAgICBsZXQgb3JpZ2luVG9kbyA9IHRoaXMucmVhZFRvZG9CeUlkKGlkKTtcbiAgICBPYmplY3QuYXNzaWduKG9yaWdpblRvZG8sIG5ld1RvZG8pO1xuICB9XG4gIHB1c2hUb1NlbGVjdFN0YXRlKHRvZG8sIHN0YXRlKSB7XG4gICAgdGhpcy50b2RvX3N0b3JhZ2Vbc3RhdGVdLnB1c2godG9kbyk7XG4gIH1cblxuICBkZWxldGVJRChpZCkge1xuICAgIHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKEVsZW1lbnQpID0+IEVsZW1lbnQgPT09IGlkKTtcbiAgfVxuICBnZW5lcmF0ZUlEKCkge1xuICAgIGxldCBpZDtcbiAgICBkbyB7XG4gICAgICBpZCA9IHRoaXMuZ2VuZXJhdGVTaW5nbGVJRCgpO1xuICAgIH0gd2hpbGUgKHRoaXMuZ2VuZXJhdGVkSURzLmZpbmQoKGVsZW1lbnQpID0+IGVsZW1lbnQgPT09IGlkKSk7XG4gICAgdGhpcy5nZW5lcmF0ZWRJRHMucHVzaChpZCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG4gIGdlbmVyYXRlU2luZ2xlSUQoKSB7XG4gICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApO1xuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICBzaG93KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb19zdG9yYWdlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmdlbmVyYXRlZElEcyk7XG4gIH1cbn1cblxuY29uc3QgdG9kb01hbmFnZXIgPSBuZXcgVG9kb01hbmFnZXIoKTtcbi8vIHRvZG9NYW5hZ2VyLmNyZWF0ZVRvZG8oXCJ0ZXN0XCIsIFwiMTIzXCIsIFwiZGVmYXVsdFwiKTtcbi8vIHRvZG9NYW5hZ2VyLmNyZWF0ZVRvZG8oXCJ0ZXN0XCIsIFwiMTIzXCIsIFwicHJvZ3Jlc3NcIik7XG50b2RvTWFuYWdlci5jcmVhdGVUb2RvKFwiMVwiLCBcIlRpdGxlIDFcIiwgXCJEZXNjcmlwdGlvbiAxXCIsIFwiZGVmYXVsdFwiKTtcbnRvZG9NYW5hZ2VyLnVwZGF0ZVRvZG8oXCIxXCIsIHtcbiAgdGl0bGU6IFwiVXBkYXRlZCBUaXRsZVwiLFxuICBkZXNjcmlwdGlvbjogXCJVcGRhdGVkIERlc2NyaXB0aW9uXCIsXG59KTtcbi8vIHRvZG9NYW5hZ2VyLmdlbmVyYXRlSUQoKTtcbi8vIHRvZG9NYW5hZ2VyLmRlbGV0ZVRvZG9CeUlkKFwiMlwiKTtcbi8vIHRvZG9NYW5hZ2VyLnJlYWRUb2RvQnlJZChcIjFcIik7XG5cbnRvZG9NYW5hZ2VyLnNob3coKTtcblxuLy8gZnVuY3Rpb24gQ3JlYXRlVG9kb0RPTShOZXd0b2RvKSB7XG4vLyAgIGNvbnN0IE5ld3RvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICBOZXd0b2RvRGl2LnRleHRDb250ZW50ID0gTmV3dG9kby50aXRsZTtcbi8vICAgY29uc3QgTmV3dG9kb0RpdkRlc2NyaWJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4vLyAgIE5ld3RvZG9EaXZEZXNjcmliZS50ZXh0Q29udGVudCA9IE5ld3RvZG8uZGVzY3JpcHRpb247XG4vLyAgIE5ld3RvZG9EaXYuYXBwZW5kQ2hpbGQoTmV3dG9kb0RpdkRlc2NyaWJlKTtcbi8vICAgLy8gICBhZGRpbmcgYnV0dG9uIHRvIE5ld3RvZG9EaXZcbi8vICAgYXBwZW5kQ2hpbGR0b1N0YXRlRGl2KE5ld3RvZG9EaXYsIE5ld3RvZG8uc3RhdGUpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBhcHBlbmRDaGlsZHRvU3RhdGVEaXYoQ2hpbGQsIFN0YXRlKSB7XG4vLyAgIHN3aXRjaCAoU3RhdGUpIHtcbi8vICAgICBjYXNlIFwiZGVmYXVsdFwiOlxuLy8gICAgICAgZGVmYXVsdFN0YXRlRGl2LmFwcGVuZENoaWxkKENoaWxkKTtcbi8vICAgICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgXCJwcm9ncmVzc1wiOlxuLy8gICAgICAgcHJvZ3Jlc3NTdGF0ZURpdi5hcHBlbmRDaGlsZChDaGlsZCk7XG4vLyAgICAgICBicmVhaztcbi8vICAgICBjYXNlIFwiZmluaXNoXCI6XG4vLyAgICAgICBmaW5pc2hTdGF0ZURpdi5hcHBlbmRDaGlsZChDaGlsZCk7XG4vLyAgICAgICBicmVhaztcbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgY29uc29sZS5sb2coXCJlcnJvcjpub25lIFN0YXRlIGF2YWlsYWJsZSFcIik7XG4vLyAgIH1cbi8vIH1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==