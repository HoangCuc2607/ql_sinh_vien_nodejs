import { AppDataSource } from '../../config/database'
import { Student } from './student.entity'

export const StudentRepository = AppDataSource.getRepository(Student)
