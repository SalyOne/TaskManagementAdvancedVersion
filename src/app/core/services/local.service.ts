import {Injectable, signal} from '@angular/core';
import {ITask} from "../Interfaces/itask";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly STORAGE_KEY = 'tasks';
  private taskIdCounter = signal(this.getLastTaskId());
  constructor() {}


  getTasks(): ITask[] {
    const tasks = localStorage.getItem(this.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private saveTasks(tasks: ITask[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }
  private getLastTaskId(): number {
    const tasks = this.getTasks();
    return tasks.length > 0 ? Math.max(...tasks.map(t => +t.id)) + 1 : 1;
  }
  private generateTaskId(): number {
    const newId = this.taskIdCounter();
    this.taskIdCounter.set(newId + 1); // Increment for the next task
    return newId;
  }
  // Add a new task
  addTask(task: ITask): void {
    const tasks = this.getTasks();
    const newTask: ITask = { ...task, id: this.generateTaskId() };
    console.log(task)
    tasks.push(newTask);
    this.saveTasks(tasks);
  }
  // Update a task
  updateTask(updatedTask: any): void {
    if (updatedTask){
      const tasks = this.getTasks().map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
      this.saveTasks(tasks);
    }
  }

  getTaskById(id: number|string): ITask | undefined {
    return this.getTasks().find(task => task.id === id);
  }
  // Delete a task
  deleteTask(id: string|number): void {
    const tasks = this.getTasks().filter((task) => task.id !== id);
    this.saveTasks(tasks);
  }

  // Clear all tasks
  clearTasks(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

