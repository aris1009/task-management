import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        value = value.toUpperCase();
        if (!(value in TaskStatus))
            throw new BadRequestException(`"${value}" is not a valid Status`);

        return value;
    }
}