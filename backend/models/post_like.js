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
      foreignKey: "postId",
      as: "post",
      onDelete: "CASCADE",
    });

    postLike.belongsTo(models.USER, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE",
    });
  }

  return postLike;
}