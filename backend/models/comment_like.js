module.exports = function(sequelize, DataTypes) {
  const commentLike = sequelize.define('COMMENT_LIKE', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  })

  commentLike.associate = function(models) {
    commentLike.belongsTo(models.COMMENT, {
      as: "comment",
      onDelete: "CASCADE",
    });

    commentLike.belongsTo(models.USER, {
      as: "user",
      onDelete: "CASCADE",
    });
  }

  return commentLike;
}