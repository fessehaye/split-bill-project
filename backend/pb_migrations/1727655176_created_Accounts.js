/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jmgx0yn3r20jqx3",
    "created": "2024-09-30 00:12:56.009Z",
    "updated": "2024-09-30 00:12:56.009Z",
    "name": "Accounts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2ye7vrf4",
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
      },
      {
        "system": false,
        "id": "lenq145f",
        "name": "type",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "3stpny1m",
        "name": "balance",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jmgx0yn3r20jqx3");

  return dao.deleteCollection(collection);
})
