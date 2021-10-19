module.exports = function(sequelize, DataTypes) {
  const postLike = sequelize.define('POST_LIKE', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'postLikePostId',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'postLikeUserId',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  })

  postLike.associate = function(models) {
    postLike.belongsTo(models.POST, {
      foreignKey: 'postId'
    });

    postLike.belongsToMany(models.USER, {
      foreignKey: 'userId'
    });
  }

  return postLike;
}