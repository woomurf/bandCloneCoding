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
    user.hasMany(models.MEMBER, { foreignKey: 'userId' });
    user.hasMany(models.PROFILE, { foreignKey: 'userId' });
    user.belongsToMany(models.POST, { through: 'USER_POST' });
    user.belongsToMany(models.COMMENT, { through: 'USER_COMMENT', foreignKey: 'author' });
    user.belongsToMany(models.POST_LIKE, { through: 'USER_POST_LIKE', foreignKey: 'author' });
    user.belongsToMany(models.COMMENT_LIKE, { through: 'USER_COMMENT_LIKE', foreignKey: 'userId' });
  }

  return user;
}