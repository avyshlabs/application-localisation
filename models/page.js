const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('page', {
    Page_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Page_name: {
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
    tableName: 'page',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Page_id" },
        ]
      },
    ]
  });
};
