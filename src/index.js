import { TodoManager } from "./Logic";
import TodoDOM_Manager, { createBtn, deleteBtn } from "./DOM-manipulate";

const todoManager = new TodoManager();
const todoDOM_Manager = new TodoDOM_Manager();

createBtn.addEventListener("click", () => {
  // update data from DOM
  todoDOM_Manager.readInputValues_DOM();
  // get data from current DOM data
  const updatedDOM_Value = todoDOM_Manager.getInputValues_DOM();
  todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  // create todo and store
  todoManager.createTodo(updatedDOM_Value);
  // because use the same reference,it would add id property!
  // todoDOM_Manager.createTodo_DOM(updatedDOM_Value);
  todoManager.show();
});
