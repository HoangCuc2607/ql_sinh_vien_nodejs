import { StudentRepository } from './student.repository'
import { AppDataSource } from '../../config/database'
import { ClassEntity } from '../class/class.entity'
import { Student } from './student.entity'

export class StudentService {
  // Lấy danh sách sinh viên
  static async getAll() {
    return StudentRepository.find({
      relations: ['class'],
    })
  }

  // Lấy sinh viên theo id
  static async getById(id: number) {
    const student = await StudentRepository.findOne({
      where: { id },
      relations: ['class'],
    })

    if (!student) {
      throw new Error('Student not found')
    }

    return student
  }

  // Tạo sinh viên
  static async create(data: {
    fullName: string
    email: string
    dob: Date
    classId: number
  }) {
    const classRepo = AppDataSource.getRepository(ClassEntity)

    const cls = await classRepo.findOne({
      where: { id: data.classId },
    })

    if (!cls) {
      throw new Error('Class not found')
    }

    const student = new Student()
    student.fullName = data.fullName
    student.email = data.email
    student.dob = data.dob
    student.class = cls

    return StudentRepository.save(student)
  }

  // Xoá sinh viên
  static async delete(id: number) {
    const student = await StudentRepository.findOneBy({ id })

    if (!student) {
      throw new Error('Student not found')
    }

    await StudentRepository.remove(student)
    return { message: 'Student deleted successfully' }
  }
}
