module.exports = function(sequelize, DataTypes) {
  const comment = sequelize.define('COMMENT', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  })

  comment.associate = function(models) {
    comment.belongsTo(models.POST, {
      as: "post",
      onDelete: "CASCADE",
    });

    comment.belongsTo(models.USER, {
      as: "user",
      onDelete: "CASCADE",
    });
  }

  return comment;
}