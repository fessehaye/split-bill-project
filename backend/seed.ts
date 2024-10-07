import PocketBase from 'pocketbase'
import { faker } from '@faker-js/faker'

const pb = new PocketBase('http://127.0.0.1:8090')

function formatDateToCustomString(date: Date) {
  const isoString = date.toISOString()
  const [datePart, timePart] = isoString.split('T')

  const timePartWithoutZ = timePart.replace('Z', '')

  return `${datePart} ${timePartWithoutZ}Z`
}

async function seedDatabase() {
  const userIds = []
  const accountIds = []
  let firstAccount = ''

  // create Users
  console.log('Creating Users...')
  for (let i = 0; i < 7; i++) {
    const [firstName, lastName] = [faker.person.firstName(), faker.person.lastName()]
    const email = faker.internet.email({ firstName, lastName })
    if (i === 0) {
      firstAccount = email
    }
    const data = {
      username: faker.internet.userName({ firstName, lastName }),
      email,
      emailVisibility: true,
      password: 'BankAccount1',
      passwordConfirm: 'BankAccount1',
      name: `${firstName} ${lastName}`
    }
    const user = await pb.collection('users').create(data)
    userIds.push(user.id)
  }

  // Create Friends
  console.log('Creating Mutual Friends...')
  for (let i = 0; i < userIds.length; i++) {
    const user1 = userIds[i]

    // Randomly select a number of friends for this user
    const numberOfFriends =
      i === 0 ? userIds.length - 1 : Math.floor(Math.random() * (userIds.length - 1)) + 1 // Ensure at least 1 friend

    // Randomly select friends
    const friendsSet = new Set<string>()
    while (friendsSet.size < numberOfFriends) {
      const randomIndex = Math.floor(Math.random() * userIds.length)
      const user2 = userIds[randomIndex]

      // Prevent a user from befriending themselves and avoid duplicate friendships
      if (user1 !== user2 && !friendsSet.has(user2)) {
        friendsSet.add(user2)
      }
    }

    // Create friend records
    for (const friend of Array.from(friendsSet)) {
      const friendData = {
        user1: user1,
        user2: friend
      }

      await pb.collection('friends').create(friendData)
    }
  }

  // Create Accounts
  console.log('Creating Accounts...')

  const accountTypes = ['Checking account', 'Savings', 'GIC', 'Line of Credit']
  for (let i = 0; i < userIds.length; i++) {
    const user = userIds[i]

    const numberOfAccounts = faker.number.int({ min: 2, max: accountTypes.length - 1 })

    for (let k = 0; k < numberOfAccounts; k++) {
      const balance = faker.number.float({ min: 1000, max: 10000, fractionDigits: 2 })
      const budget = faker.number.float({ min: 400, max: balance, fractionDigits: 2 })
      const remaining = faker.number.float({ min: 200, max: budget - 100, fractionDigits: 2 })
      const data = {
        user: user,
        type: accountTypes[k],
        balance: balance,
        budget: budget,
        remaining: remaining
      }

      const account = await pb.collection('accounts').create(data)
      accountIds.push(account.id)
    }
  }

  // Create Transactions
  console.log('Creating Transactions...')

  const categories = [
    'Groceries',
    'Restaurants & Bars',
    'Entertainment',
    'Bills',
    'Shopping',
    'Travelling'
  ]

  const vendors: { category: string; vendorName: string; vendorAvatarPath: string }[] = []

  for (let i = 0; i < 20; i++) {
    const categoryId = faker.number.int({ min: 0, max: categories.length - 1 })
    vendors.push({
      category: categories[categoryId],
      vendorName: faker.company.name(),
      vendorAvatarPath: faker.image.avatar()
    })
  }

  for (let i = 0; i < accountIds.length; i++) {
    const account = accountIds[i]

    const numberOfTransactions = faker.number.int({ min: 10, max: 40 })

    for (let k = 0; k < numberOfTransactions; k++) {
      const amount = faker.number.float({ min: 5, max: 240, fractionDigits: 2 })
      const vendor = vendors[faker.number.int({ min: 0, max: vendors.length - 1 })]
      const earlyDate = new Date()
      earlyDate.setMonth(earlyDate.getMonth() - 1)
      const transDate = faker.date.between({ from: earlyDate, to: Date.now() })
      const data = {
        account: account,
        amount: amount,
        category: vendor.category,
        vendorName: vendor.vendorName,
        vendorAvatarPath: vendor.vendorAvatarPath,
        notes: faker.food.description(),
        transactionDate: formatDateToCustomString(transDate)
      }

      await pb.collection('transactions').create(data)
    }
  }
  console.log('Seeding is complete!')
  console.log(`Use email ${firstAccount}. All accounts passwords are "BankAccount1"`)
}

try {
  seedDatabase()
} catch (error) {
  console.log(error)
}
