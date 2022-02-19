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
      foreignKey: 'commentId'
    });

    commentLike.belongsToMany(models.USER, {
      foreignKey: 'userId',
      through: 'USER_COMMENT_LIKE',
    });
  }

  return commentLike;
}