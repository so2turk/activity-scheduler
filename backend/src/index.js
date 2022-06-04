import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 5555
app.get('/', (req, res) => res.send('Server is up and running'))
app.listen(port, () => console.log(`Listening on port: ${port}`))
