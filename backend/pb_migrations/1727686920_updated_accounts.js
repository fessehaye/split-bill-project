/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  // remove
  collection.schema.removeField("g6kxuwal")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g6kxuwal",
    "name": "field",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
