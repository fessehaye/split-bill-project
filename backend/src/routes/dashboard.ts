import express, { Router } from 'express'
import {
  Collections,
  AccountsResponse,
  UsersResponse,
  TransactionsResponse
} from '../pocketbase-types'
import PocketBase from 'pocketbase'

const router: Router = express.Router()
const pb = new PocketBase('http://127.0.0.1:8090')

router.get('/dashboard-profile', async (req, res) => {
  const token = req.headers.authorization

  if (token === undefined) {
    res.status(400).json({
      message: 'Missing token',
      error: 'Token is missing!'
    })
    return
  }
  pb.authStore.save(token)

  try {
    const records = await pb.collection<AccountsResponse>(Collections.Accounts).getFullList({
      sort: '-created'
    })
    const user = await pb.collection<UsersResponse>(Collections.Users).getFirstListItem('')
    const accountInfo = records.map((record) => {
      return {
        id: record.id,
        name: record.type,
        remaining: record.remaining,
        budget: record.budget,
        balance: record.balance
      }
    })
    res.status(200).json({
      accounts: accountInfo,
      name: user.name
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error')
    res.status(401).json({
      message: 'Unauthorized',
      error: err.message
    })
  }
})

router.get('/dashboard-profile/transactions/:id', async (req, res) => {
  const token = req.headers.authorization
  const accountId = req.params.id
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1

  if (token === undefined) {
    res.status(400).json({
      message: 'Missing token',
      error: 'Token is missing!'
    })
    return
  }
  pb.authStore.save(token)

  try {
    const list = await pb
      .collection<TransactionsResponse>(Collections.Transactions)
      .getList(page, 50, {
        filter: `account = "${accountId}"`
      })
    const transactionInfo = list.items.map((record) => {
      return {
        id: record.id,
        name: record.vendorName,
        avatar: record.vendorAvatarPath,
        amount: record.amount,
        date: record.transactionDate
      }
    })
    res.status(200).json({
      transactions: transactionInfo,
      page: list.page,
      total: list.totalPages
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
