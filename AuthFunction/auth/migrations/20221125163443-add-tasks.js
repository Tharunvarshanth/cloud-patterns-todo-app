"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("tasks", {
    id: {
      type: "int",
      unsigned: true,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: "int",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "users_tasks_id_foreign",
        table: "users",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: "id",
      },
    },
    title: {
      type: "string",
      notNull: true,
    },
    description: {
      type: "text",
    },
    isDone: {
      type: "boolean",
      defaultValue: false,
    },
    timestampCreated: {
      type: "timestamp",
      timezone: true,
    },
    timestampUpdated: {
      type: "timestamp",
      timezone: true,
    },
  });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
