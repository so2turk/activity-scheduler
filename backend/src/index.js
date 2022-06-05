import express from 'express'
import cors from 'cors'
import userRouter from './routes/user-router.js'
import activityRouter from './routes/activity-router.js'
import jwtRouter from './routes/jwt-router.js'
import('./utils/db-connection.js')

const app = express()
app.use(
	cors({
		origin: true,
		credentials: true,
	})
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)
app.use('/api/activity', activityRouter)
app.use('/api/jwt', jwtRouter)

const port = process.env.PORT || 5555
app.get('/api', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Listening on port: ${port}`))
