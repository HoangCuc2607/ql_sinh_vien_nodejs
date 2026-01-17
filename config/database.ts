import { DataSource } from 'typeorm'
import { User } from '../modules/user/user.entity'
import { Student } from '../modules/student/student.entity'
import { ClassEntity } from '../modules/class/class.entity'
import { Subject } from '../modules/subject/subject.entity'
import { Score } from '../modules/score/score.entity'
import dotenv from 'dotenv'

dotenv.config()


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Student, ClassEntity, Subject, Score],
  migrations: ['src/migrations/*.ts'],
})
