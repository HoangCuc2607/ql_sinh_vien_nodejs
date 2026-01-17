import express from 'express'
import cors from 'cors'
import authRoutes from './modules/auth/auth.routes'
import studentRoutes from './modules/student/student.routes'
import classRoutes from './modules/class/class.routes'
import userRoutes from './modules/user/user.routes'
import scoreRoutes from './modules/score/score.routes'
import subjectRoutes from './modules/subject/subject.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/users', userRoutes)
app.use('/api/scores', scoreRoutes)
app.use('/api/subjects', subjectRoutes)

export default app
