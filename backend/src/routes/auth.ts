import express, { Router } from 'express'
import PocketBase from 'pocketbase'

const router: Router = express.Router()
const pb = new PocketBase('http://127.0.0.1:8090')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const authData = await pb.collection('users').authWithPassword(email, password)

    res.status(200).json({
      message: 'Login successful',
      token: authData.token, // PocketBase auth token,
      userId: authData.record.id
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    res.status(401).json({
      message: 'Invalid credentials',
      error: err.message
    })
  }
})

router.post('/logout', (_, res) => {
  pb.authStore.clear()
  res.status(200).json({ message: 'Logged out successfully' })
})

export default router
