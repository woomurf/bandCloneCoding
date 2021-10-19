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
    user.hasMany(models.MEMBER);
    user.hasMany(models.PROFILE);
    user.hasMany(models.POST);
    user.hasMany(models.COMMENT);
    user.hasMany(models.POST_LIKE);
    user.hasMany(models.COMMENT_LIKE);
  }

  return user;
}