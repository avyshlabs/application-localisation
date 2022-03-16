const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_language', {
    User_Lang_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    User_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'User_id'
      }
    },
    Language_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'language',
        key: 'Language_id'
      }
    },
    Created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Updated_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_language',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_Lang_id" },
        ]
      },
      {
        name: "User_id",
        using: "BTREE",
        fields: [
          { name: "User_id" },
        ]
      },
      {
        name: "Language_id",
        using: "BTREE",
        fields: [
          { name: "Language_id" },
        ]
      },
    ]
  });
};
