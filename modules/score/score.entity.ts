import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm'
import { Student } from '../student/student.entity'
import { Subject } from '../subject/subject.entity'

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => Student, (student) => student.id)
  @JoinColumn({name: 'student_id'})
  student!: Student

  @ManyToOne(() => Subject, (subject) => subject.scores)
  @JoinColumn({name: 'subject_id'})
  subject!: Subject

  @Column('float')
  score!: number

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date
}
