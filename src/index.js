import { TodoManager } from "./Logic";
import TodoDOM_Manager from "./DOM-manipulate";

const todoManager = new TodoManager();
const todoDOM_Manager = new TodoDOM_Manager();

// todoManager.updateTodo("1", {
//   title: "Updated Title",
//   description: "Updated Description",
// });
todoManager.createTodo("1", "Title 1", "Description 1", "default");
todoDOM_Manager.updateInputValues_DOM();
todoManager.updateTodo("1", todoDOM_Manager.getInputValues_DOM());
todoDOM_Manager.createTodo_DOM(todoDOM_Manager.getInputValues_DOM());

todoManager.show();

console.log(todoDOM_Manager.getInputValues_DOM());
