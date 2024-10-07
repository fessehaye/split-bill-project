/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3zo72zxkkvy4ko0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g8cg8mgu",
    "name": "bill",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8m59zoyi26sr8j9",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l89iks3q",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3zo72zxkkvy4ko0")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g8cg8mgu",
    "name": "bill",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "8m59zoyi26sr8j9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "l89iks3q",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
