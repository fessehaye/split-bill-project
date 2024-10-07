/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s3brhjvq",
    "name": "budget",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8um7wszq",
    "name": "remaining",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3")

  // remove
  collection.schema.removeField("s3brhjvq")

  // remove
  collection.schema.removeField("8um7wszq")

  return dao.saveCollection(collection)
})
