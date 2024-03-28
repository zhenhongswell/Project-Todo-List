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

export class TodoManager {
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
