import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: {
    id: number
    role: 'admin' |'student'
  }
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing token' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' })
  }

  try {
    const payload = verifyToken(token) as {
      id: number
      role: 'admin' | 'student'
    }

    req.user = {
      id: payload.id,
      role: payload.role
    }

    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
