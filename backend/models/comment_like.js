module.exports = function(sequelize, DataTypes) {
  const commentLike = sequelize.define('COMMENT_LIKE', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'commentLikeCommentId',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'commentLikeUserId',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  })

  commentLike.associate = function(models) {
    commentLike.belongsTo(models.COMMENT, {
      foreignKey: 'commentId'
    });

    commentLike.belongsToMany(models.USER, {
      foreignKey: 'userId'
    });
  }

  return commentLike;
}