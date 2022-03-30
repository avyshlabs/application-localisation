const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page_map', {
    Page_map_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'page',
        key: 'Page_id'
      }
    },
    Label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'label',
        key: 'Label_id'
      }
    },
    Created_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Updated_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Status: {
      type: DataTypes.STRING(255),
      defaultValue: "active",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'page_map',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Page_map_id" },
        ]
      },
      {
        name: "Page_id",
        using: "BTREE",
        fields: [
          { name: "Page_id" },
        ]
      },
      {
        name: "Label_id",
        using: "BTREE",
        fields: [
          { name: "Label_id" },
        ]
      },
    ]
  });
};
