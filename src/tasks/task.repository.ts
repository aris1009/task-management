import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";

import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks({ status, search }: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        if (status) query.andWhere(`task.status = :status`, { status });
        if (search) query.andWhere(`(task.title LIKE :search OR task.description LIKE :search)`, { search: `%${search}%` });

        const result = await query.getMany();

        return result;
    }

    async createTask(
        { title, description }: CreateTaskDto
    ): Promise<Task> {
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();
        return task;
    }
}