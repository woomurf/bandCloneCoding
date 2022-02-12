module.exports = function(sequelize, DataTypes) {
  const profile = sequelize.define('PROFILE', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImageUrl: {
      type: DataTypes.STRING,
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

  profile.associate = function(models) {
    profile.belongsTo(models.USER, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE",
    });
  }

  return profile;
}