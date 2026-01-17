import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm'
import { Student } from '../student/student.entity'

@Entity('classes')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  year!: number

  @OneToMany(() => Student, (student) => student.class)
  students!: Student[]

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date
}
