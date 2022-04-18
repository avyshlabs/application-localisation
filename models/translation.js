const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('translation', {
    Translation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Label_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'label',
        key: 'Label_id'
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
    Translation_value: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Updated_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Status: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'translation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Translation_id" },
        ]
      },
      {
        name: "Label_id",
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
