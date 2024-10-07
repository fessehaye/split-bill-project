/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  // remove
  collection.schema.removeField("u8vrko7s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wsjxcqh9",
    "name": "notes",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8m59zoyi26sr8j9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u8vrko7s",
    "name": "notes",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("wsjxcqh9")

  return dao.saveCollection(collection)
})
