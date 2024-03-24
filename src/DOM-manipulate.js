export const contentDiv = document.querySelector(".content");
export const defaultStateDiv = contentDiv.querySelector(".default");
export const progressStateDiv = contentDiv.querySelector(".progress");
export const finishStateDiv = contentDiv.querySelector(".finish");

class TodoManager {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.renderTodo(todo);
  }

  renderTodo(todo) {
    const todoDiv = document.createElement("div");
    todoDiv.textContent = todo.title;
    const descriptionPara = document.createElement("p");
    descriptionPara.textContent = todo.description;
    todoDiv.appendChild(descriptionPara);

    this.appendChildToStateDiv(todoDiv, todo.state);
  }

  appendChildToStateDiv(child, state) {
    switch (state) {
      case "default":
        defaultStateDiv.appendChild(child);
        break;
      case "progress":
        progressStateDiv.appendChild(child);
        break;
      case "finish":
        finishStateDiv.appendChild(child);
        break;
      default:
        console.log("Error: None State available!");
    }
  }
}
