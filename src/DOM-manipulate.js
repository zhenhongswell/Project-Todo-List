// Different progress Div
const contentDiv = document.querySelector(".content");
const defaultStateDiv = contentDiv.querySelector(".default");
const progressStateDiv = contentDiv.querySelector(".progress");
const finishStateDiv = contentDiv.querySelector(".finish");

// INPUTS Value creating Todo
const createTodo = document.querySelector(".createTodo");
export const createButton = createTodo.querySelector(".create");
export const deleteButton = document.querySelector(".delete");
export const saveAllEditButton = document.querySelector(".saveAllEdit");
const titleInput = createTodo.querySelector("#title");
const descriptionInput = createTodo.querySelector("#describe");
const stateInput = createTodo.querySelector("#state");

export default class TodoDOM_Manager {
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
