import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { Score } from '../score/score.entity'

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  credit!: number

  @OneToMany(() => Score, (score) => score.subject)
  scores!: Score[]

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date
}
