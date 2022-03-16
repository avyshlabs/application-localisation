const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('label', {
    Label_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Label_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Label_value: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'label',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Label_id" },
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
