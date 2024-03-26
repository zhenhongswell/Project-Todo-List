// Different progress Div
const contentDiv = document.querySelector(".content");
const defaultStateDiv = contentDiv.querySelector(".default");
const progressStateDiv = contentDiv.querySelector(".progress");
const finishStateDiv = contentDiv.querySelector(".finish");

// INPUTS Value creating Todo
const createTodo = document.querySelector(".createTodo");
export const createBtn = createTodo.querySelector(".create");
export const deleteBtn = createTodo.querySelector(".delete");
const titleInput = createTodo.querySelector("#title");
const descriptionInput = createTodo.querySelector("#describe");
const stateInput = createTodo.querySelector("#state");

export default class TodoDOM_Manager {
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
