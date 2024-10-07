/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Accounts = "accounts",
	BillSplits = "bill_splits",
	Bills = "bills",
	Friends = "friends",
	Transactions = "transactions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AccountsRecord = {
	balance?: number
	budget?: number
	remaining?: number
	type: string
	user: RecordIdString
}

export enum BillSplitsStatusOptions {
	"pending" = "pending",
	"paid" = "paid",
	"rejected" = "rejected",
}
export type BillSplitsRecord = {
	amount: number
	bill?: RecordIdString
	status?: BillSplitsStatusOptions
	user?: RecordIdString
}

export type BillsRecord = {
	notes?: string
	split_between?: RecordIdString[]
	transaction?: RecordIdString
}

export type FriendsRecord = {
	user1: RecordIdString
	user2: RecordIdString
}

export type TransactionsRecord = {
	account: RecordIdString
	amount?: number
	category: string
	notes?: string
	transactionDate: IsoDateString
	vendorAvatarPath?: string
	vendorName: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AccountsResponse<Texpand = unknown> = Required<AccountsRecord> & BaseSystemFields<Texpand>
export type BillSplitsResponse<Texpand = unknown> = Required<BillSplitsRecord> & BaseSystemFields<Texpand>
export type BillsResponse<Texpand = unknown> = Required<BillsRecord> & BaseSystemFields<Texpand>
export type FriendsResponse<Texpand = unknown> = Required<FriendsRecord> & BaseSystemFields<Texpand>
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	accounts: AccountsRecord
	bill_splits: BillSplitsRecord
	bills: BillsRecord
	friends: FriendsRecord
	transactions: TransactionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	accounts: AccountsResponse
	bill_splits: BillSplitsResponse
	bills: BillsResponse
	friends: FriendsResponse
	transactions: TransactionsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'accounts'): RecordService<AccountsResponse>
	collection(idOrName: 'bill_splits'): RecordService<BillSplitsResponse>
	collection(idOrName: 'bills'): RecordService<BillsResponse>
	collection(idOrName: 'friends'): RecordService<FriendsResponse>
	collection(idOrName: 'transactions'): RecordService<TransactionsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
