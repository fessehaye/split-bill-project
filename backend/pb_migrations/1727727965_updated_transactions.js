/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jwidoax0",
    "name": "vendorName",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zdajgwcz",
    "name": "vendorAvatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  // remove
  collection.schema.removeField("jwidoax0")

  // remove
  collection.schema.removeField("zdajgwcz")

  return dao.saveCollection(collection)
})
