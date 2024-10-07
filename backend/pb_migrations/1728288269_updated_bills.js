/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytlkvicj",
    "name": "transaction",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zunsbmrumx62s0o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ytlkvicj",
    "name": "transaction_name",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "zunsbmrumx62s0o",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
