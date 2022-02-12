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
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    profileImageUrl: {
      type: DataTypes.STRING, // add default value
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
    group.hasMany(models.MEMBER, {
      foreignKey: "memberId",
      as: "members",
      onDelete: "CASCADE",
    });
    group.hasMany(models.POST, {
      foreignKey: "postId",
      as: "posts",
      onDelete: "CASCADE",
    });
  }

  return group;
} 