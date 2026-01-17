import { Request, Response } from 'express'
import { UserRepository } from '../user/user.repository'
import bcrypt from 'bcrypt'
import { signToken } from '../../utils/jwt'
console.log(signToken + "= signToken in auth.controller.ts");
export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password } = req.body

    // Tìm user
    const user = await UserRepository.findOne({
      where: { username },
    })
    
    if (!user) {
      return res.status(401).json({ message: 'Sai username hoặc password' })
    }

    // So sánh password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Saihoặc password' })
    }

    // Tạo JWT
    const token = signToken({
      id: user.id,
      role: user.role,
    })

    // Trả token
    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    })
  }
}
