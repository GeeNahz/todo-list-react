import { v4 as uuidv4 } from "uuid";

class TodoService {
  constructor() {
    this.activeTasks = JSON.parse(localStorage.getItem("active-tasks")) || [];
    this.completedTasks = JSON.parse(localStorage.getItem("completed-tasks")) || [];
  }

  saveToLocalStorage(itemId, arr) {
    localStorage.setItem(itemId, JSON.stringify(arr));
  }

  findTaskIndex(id, arr) {
    const index = arr.findIndex(task => task.id === id);
    return index;
  }

  getTasks() {
    return { activeTasks: this.activeTasks, completedTasks: this.completedTasks, };
  }

  addTask(item) {
    const arr = item.text.split("//");
    let task = arr[0];
    let note = arr[1] || "";

    this.activeTasks.push({
      id: item.id || uuidv4(),
      isComplete: false,
      dueDate: new Date().toDateString(), // will require this later
      task: task.trim(),
      note: note.trim(),
    });

    this.saveToLocalStorage("active-tasks", this.activeTasks);
    
    return { activeTasks: this.activeTasks, completedTasks: this.completedTasks, };
  }

  completeTask(task) {
    const index = this.findTaskIndex(task.id, this.activeTasks);

    let completedTask = this.activeTasks.splice(index, 1)[0];
    completedTask.isComplete = true;

    this.completedTasks.push(completedTask);

    this.saveToLocalStorage("active-tasks", this.activeTasks);
    this.saveToLocalStorage("completed-tasks", this.completedTasks);

    return { activeTasks: this.activeTasks, completedTasks: this.completedTasks, };
  }

  undoCompleteTask(task) {
    const index = this.findTaskIndex(task.id, this.completedTasks);

    let undoTask = this.completedTasks.splice(index, 1)[0];
    undoTask.isComplete = false;
    this.activeTasks.push(undoTask);

    this.saveToLocalStorage("active-tasks", this.activeTasks);
    this.saveToLocalStorage("completed-tasks", this.completedTasks);

    return { activeTasks: this.activeTasks, completedTasks: this.completedTasks, };
  }

  deleteTask(task, arr, key) {
    const index = this.findTaskIndex(task.id, arr);
    arr.splice(index, 1);
    this.saveToLocalStorage(key, arr);

    return { activeTasks: this.activeTasks, completedTasks: this.completedTasks, };
  }

  deleteActiveTask(task) {
    return this.deleteTask(task, this.activeTasks, "active-tasks");
  }

  deleteCompletedTask(task) {
    return this.deleteTask(task, this.completedTasks, "completed-tasks");
  }
}

export default TodoService;
