import { TodoManager } from "./Logic";
import TodoDOM_Manager, {
  createButton,
  deleteButton,
  saveAllEditButton,
} from "./DOM-manipulate";

const todoManager = new TodoManager();
const todoDOM_Manager = new TodoDOM_Manager();

createButton.addEventListener("click", () => {
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

deleteButton.addEventListener("click", () => {
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

saveAllEditButton.addEventListener("click", () => {
  const allTododata = todoDOM_Manager.getAllTodoData();
  allTododata.forEach((tododata) => {
    todoManager.updateTodo(tododata.id, tododata);
  });

  console.log(allTododata);

  todoManager.show();
});
