/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p3h4czzptn8plz3")

  collection.listRule = "user1.id = @request.auth.id"
  collection.viewRule = "user1.id = @request.auth.id"
  collection.updateRule = "user1.id = @request.auth.id"
  collection.deleteRule = "user1.id = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p3h4czzptn8plz3")

  collection.listRule = null
  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
