import 'dotenv/config'
import express from 'express'
import userRouter from './routes/user-router.js'
import('./utils/db-connection.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)

const port = process.env.PORT || 5555
app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Listening on port: ${port}`))
