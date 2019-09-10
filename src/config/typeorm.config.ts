import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from './../tasks/task.entity';
import { User } from './../auth/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0101',
    database: 'taskmanagement',
    entities: [
        Task,
        User,
        // __dirname + '../*/*.entity.ts',
    ],
    synchronize: true
}