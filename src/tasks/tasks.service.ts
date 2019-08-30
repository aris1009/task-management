import { Injectable, NotFoundException } from '@nestjs/common';

import * as uuid from 'uuid/v1';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksFiltered({ status = TaskStatus.OPEN, search = '' }: GetTasksFilterDto): Task[] {
        return this.tasks.filter(task => {
            return task.status === status
                && (task.title.toLowerCase().includes(search.toLowerCase())
                    || task.description.toLowerCase().includes(search.toLowerCase()))
        });
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(t => t.id === id);

        if (!found) throw new NotFoundException(`Task with id ${id} not found.`);

        return found;
    }

    createTask(
        { title, description }: CreateTaskDto
    ): Task {
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    updateTask(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id); // Refactor..
        task.status = status;
        return task;
    }

    deleteTaskById(id: string): void {
        this.getTaskById(id);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index > -1) this.tasks.splice(index, 1);
    }
}
