/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

  // remove
  collection.schema.removeField("zdajgwcz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rygbonsj",
    "name": "vendorAvatarPath",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zunsbmrumx62s0o")

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

  // remove
  collection.schema.removeField("rygbonsj")

  return dao.saveCollection(collection)
})
