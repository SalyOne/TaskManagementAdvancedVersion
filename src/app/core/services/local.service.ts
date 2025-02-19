import {Injectable, signal} from '@angular/core';
import {ITask} from "../Interfaces/itask";

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private readonly STORAGE_KEY = 'tasks';
  private taskIdCounter = signal(this.getLastTaskId());

  tasks$ = signal<ITask[]>(this.getTasks());

  constructor() {
  }

  private saveTasks(tasks: ITask[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
      this.tasks$.set(tasks);

    } catch (error) {
      console.error('Error saving to localStorage:', error);
      throw new Error('Failed to save tasks. Please try again later.');
    }
  }

  private getLastTaskId(): number {
    const tasks = this.getTasks();
    return tasks.length > 0 ? Math.max(...tasks.map(t => +t.id)) + 1 : 1;
  }

  private generateTaskId(): number {
    const newId = this.taskIdCounter();
    this.taskIdCounter.set(newId + 1);
    return newId;
  }

  getTasks(): ITask[] {
    try {
      const tasks = localStorage.getItem(this.STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      throw new Error('Failed to load tasks. Please try again later.');
    }
  }

  addTask(task: ITask): void {
    try {
      const tasks = this.getTasks();
      const newTask: ITask = {...task, id: this.generateTaskId(), dependency: []};
      tasks.push(newTask);
      this.saveTasks(tasks);
    } catch (error) {
      console.error('Error adding task :', error);
      throw new Error('Failed to add task. Please try again later.');
    }
  }

  updateTask(updatedTask: any): void {
    try {
      const tasks = this.getTasks().map((task) =>
        task.id === updatedTask.id ? {...task, ...updatedTask} : task
      );
      this.saveTasks(tasks);
    }catch(error) {
      throw new Error('Error updating task. Please try again later');
    }
  }

  getTaskById(id: number | string): ITask | undefined {
    return this.getTasks().find(task => task.id === id);
  }

  deleteTask(id: string | number): void {
    let tasks:any = this.getTasks().filter((task) => task.id !== id);

    tasks = tasks.map((task: ITask ) => ({
      ...task,
      dependency: task.dependency?.filter((depId: string | number) => depId !== id) || []
    }));

    this.saveTasks(tasks);
  }

  clearTasks(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
  setDependency(taskId: string | number, dependencyId: string | number): void {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === taskId);
    const dependencyTask = tasks.find(task => task.id === dependencyId);

    if (!task || !dependencyTask) {
      console.error('Task task not found.');
      return;
    }

    if (this.hasCircularDependency(taskId, dependencyId)) {
      console.warn('Circular dependency detected. Operation aborted.');
      return;
    }

    if (!task.dependency?.includes(dependencyId)) {
      task.dependency = [...(task.dependency || []), dependencyId];
      this.saveTasks(tasks);
    }
  }

  hasCircularDependency(taskId: string | number, dependencyId: string | number, visited: Set<string | number> = new Set()): boolean {
    if (taskId === dependencyId) return true;
    visited.add(taskId);

    const task = this.getTaskById(taskId);
    if (!task || !task.dependency) return false;

    return task.dependency.some(depId => {
      if (visited.has(depId)) return true;
      return this.hasCircularDependency(depId, dependencyId, new Set(visited));
    });
  }


  isTaskStatusDisabled(taskId: string | number): boolean {
    const task = this.getTaskById(taskId);
    if (!task?.dependency?.length) return false;

    return task.dependency.some(depId => {
      const depTask = this.getTaskById(depId);
      return depTask?.status !== 'Completed';
    });
  }

  canAddDependency(taskId:number | string, dependencyId: number | string): boolean {
    if (taskId === dependencyId) {
      return false; // A task cannot depend on itself
    }

    return !this.hasCircularDependency(taskId, dependencyId, new Set());
  }


}

