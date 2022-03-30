const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('language', {
    Language_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Language_name: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'language',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Language_id" },
        ]
      },
    ]
  });
};
