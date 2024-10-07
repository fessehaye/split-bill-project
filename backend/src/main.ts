import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth'
import dashboardRouter from './routes/dashboard'
import transRouter from './routes/transactions'
import splitRouter from './routes/split'

const app = express()
const port = 3000

app.use(
  cors({
    origin: 'http://localhost:5173'
  })
)
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(authRouter)
app.use(dashboardRouter)
app.use(transRouter)
app.use(splitRouter)
