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
  return db.createTable("users", {
    id: {
      type: "int",
      unsigned: true,
      notNull: true,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: "string",
      notNull: true,
      unique: true,
    },
    name: {
      type: "string",
      notNull: true,
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
  return db.dropTable("users");
};

exports._meta = {
  version: 1,
};
