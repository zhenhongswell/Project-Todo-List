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
