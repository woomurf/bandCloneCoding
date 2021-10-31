module.exports = function(sequelize, DataTypes) {
  const postLike = sequelize.define('POST_LIKE', {
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

  postLike.associate = function(models) {
    postLike.belongsTo(models.POST, {
      foreignKey: 'postId'
    });

    postLike.belongsToMany(models.USER, {
      foreignKey: 'userId',
      through: 'USER_POST_LIKE',
    });
  }

  return postLike;
}