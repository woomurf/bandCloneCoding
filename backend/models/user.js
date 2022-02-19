module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('USER', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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

  user.associate = function(models) {
    user.hasMany(models.MEMBER, {
      foreignKey: 'memberId',
      as: 'members',
      onDelete: 'CASCADE'
    });
    user.hasMany(models.PROFILE, {
      foreignKey: 'profileId',
      as: 'profiles',
      onDelete: 'CASCADE'
    });
    user.hasMany(models.POST, {
      foreignKey: 'postId',
      as: 'posts',
      onDelete: 'CASCADE'
    });
    user.hasMany(models.COMMENT, {
      foreignKey: "commentId",
      as: "comments",
      onDelete: "CASCADE",
    });
    user.hasMany(models.POST_LIKE, {
      foreignKey: "postLikeId",
      as: "postLikes",
      onDelete: "CASCADE",
    });
    user.hasMany(models.COMMENT_LIKE, {
      foreignKey: "commentLikeId",
      as: "commentLikes",
      onDelete: "CASCADE",
    });
  }

  return user;
}