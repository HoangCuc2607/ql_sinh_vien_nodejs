import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'
import { ClassEntity } from '../class/class.entity'

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({name: 'full_name'})
  fullName!: string

  @Column({ unique: true })
  email!: string

  @Column({ type: 'date' })
  dob!: Date

  @ManyToOne(() => ClassEntity, (cls) => cls.students)
  @JoinColumn({ name: 'class_id' })
  class!: ClassEntity

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date
}
