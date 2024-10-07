import express, { Router, Request } from 'express'
import {
  Collections,
  TransactionsResponse,
  FriendsResponse,
  UsersResponse,
  BillsResponse
} from '../pocketbase-types'
import PocketBase from 'pocketbase'

const router: Router = express.Router()
const pb = new PocketBase('http://127.0.0.1:8090')

type Texpand = {
  user2: UsersResponse
}

interface RequestBody {
  notes: string
  entries: {
    id: string
    amount: number
  }[]
}

router.get('/split/:id', async (req, res) => {
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
    const transactionData = await pb
      .collection<TransactionsResponse>(Collections.Transactions)
      .getOne(transactionId)
    const friendsData = await pb
      .collection<FriendsResponse<Texpand>>(Collections.Friends)
      .getFullList({
        expand: 'user2'
      })
    const friends = friendsData.map((friend) => {
      return { name: friend.expand?.user2.name, id: friend.user2 }
    })
    const transaction = {
      amount: transactionData.amount,
      category: transactionData.category,
      avatar: transactionData.vendorAvatarPath,
      name: transactionData.vendorName
    }
    res.status(200).json({ transaction, friends })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
})

router.post('/split/:id', async (req: Request<{ id: string }, unknown, RequestBody>, res) => {
  const { notes, entries } = req.body
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
  const contactIds = entries.map((entry) => entry.id)

  try {
    const billData = {
      transaction: transactionId,
      split_between: contactIds,
      notes: notes
    }

    const record = await pb.collection<BillsResponse>(Collections.Bills).create(billData)
    for (const entry of entries) {
      const splitData = {
        bill: record.id,
        user: entry.id,
        amount: entry.amount,
        status: 'pending'
      }

      await pb.collection('bill_splits').create(splitData)
    }
    res.status(200).json({ message: 'Split submitted successful' })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
})

export default router
