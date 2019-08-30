import { TaskStatus } from "../task.model";
import { IsOptional, IsEnum, IsString, IsNotEmpty } from "class-validator";

export class GetTasksFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    search: string;
}