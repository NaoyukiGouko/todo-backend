import 'reflect-metadata';

import { Entity, Column, PrimaryGeneratedColumn, /*PrimaryColumn,*/ CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IToDo } from './to-do.interface';

@Entity()
export class ToDo implements IToDo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
