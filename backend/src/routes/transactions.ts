import express, { Router } from 'express'
import { Collections, TransactionsResponse } from '../pocketbase-types'
import PocketBase from 'pocketbase'

const router: Router = express.Router()
const pb = new PocketBase('http://127.0.0.1:8090')

router.get('/transaction/:id', async (req, res) => {
  const token = req.headers.authorization
  const transactionId = req.params.id

  if (token === undefined) {
    res.status(400).json({
      message: 'Missing token',
      error: 'Token is missing!'
    })
    return
  }
  pb.authStore.save(token)

  try {
    const transaction = await pb
      .collection<TransactionsResponse>(Collections.Transactions)
      .getOne(transactionId)
    res.status(200).json({
      amount: transaction.amount,
      category: transaction.category,
      avatar: transaction.vendorAvatarPath,
      name: transaction.vendorName
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
})

export default router
