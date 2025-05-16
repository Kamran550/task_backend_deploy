import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateData: Partial<Task>): Promise<Task> {
    await this.taskRepository.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: string): Promise<void> {
    return this.taskRepository.delete(id).then(() => undefined);
  }
}
