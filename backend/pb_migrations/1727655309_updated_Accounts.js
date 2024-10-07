/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  collection.name = "accounts"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  collection.name = "Accounts"

  return dao.saveCollection(collection)
})
