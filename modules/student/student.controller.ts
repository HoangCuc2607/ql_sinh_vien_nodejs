import { Request, Response } from 'express'
import { StudentService } from './student.service'

export class StudentController {
  static async getAll(req: Request, res: Response) {
    try {
      const students = await StudentService.getAll()
      return res.json(students)
    } catch (err: any) {
      return res.status(500).json({ message: err.message })
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const student = await StudentService.getById(id)
      return res.json(student)
    } catch (err: any) {
      return res.status(404).json({ message: err.message })
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const student = await StudentService.create(req.body)
      return res.status(201).json(student)
    } catch (err: any) {
      return res.status(400).json({ message: err.message })
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id)
      const result = await StudentService.delete(id)
      return res.json(result)
    } catch (err: any) {
      return res.status(404).json({ message: err.message })
    }
  }
}
