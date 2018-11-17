module.exports = (sequelize, DataTypes) => {
    var IndexSchemaField = sequelize.define('indexschemafield', {
      id: {
          type: DataTypes.INTEGER,
          field: "id",
          primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
        primaryKey: false
      },
      value: DataTypes.STRING,
      type: DataTypes.STRING,
      index_type: DataTypes.STRING
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'indexschemafield'
    });
    IndexSchemaField.associate = function(models) {
      // associations can be defined here
    };
    return IndexSchemaField;
  };