module.exports = function(sequelize, DataTypes) {
  const group = sequelize.define('GROUP', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
  });

  group.associate = function(models) {
    group.hasMany(models.MEMBER, { foreignKey: 'groupId' });
    group.hasMany(models.POST, { foreignKey: 'groupId' });
  }

  return group;
} 