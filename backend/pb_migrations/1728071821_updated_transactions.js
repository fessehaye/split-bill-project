/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  collection.listRule = "account.user.id = @request.auth.id"
  collection.viewRule = "account.user.id = @request.auth.id"
  collection.updateRule = "account.user.id = @request.auth.id"
  collection.deleteRule = "account.user.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
