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
