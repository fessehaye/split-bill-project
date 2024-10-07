/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  // remove
  collection.schema.removeField("eeznwk9a")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eeznwk9a",
    "name": "total_amount",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
