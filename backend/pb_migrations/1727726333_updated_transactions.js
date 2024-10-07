/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nltowuvr",
    "name": "transactionDate",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yr1s0uqz",
    "name": "account",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jmgx0yn3r20jqx3",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zpsziqfv",
    "name": "category",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  // remove
  collection.schema.removeField("nltowuvr")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yr1s0uqz",
    "name": "account",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jmgx0yn3r20jqx3",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zpsziqfv",
    "name": "category",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
