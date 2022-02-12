module.exports = function(sequelize, DataTypes) {
  const member = sequelize.define('MEMBER', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('REQUESTED', 'APPROVED', 'REJECTED', 'INVITED'),
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

  member.associate = function(models) {
    member.belongsTo(models.USER, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE",
    });

    member.belongsTo(models.GROUP, {
      foreignKey: "groupId",
      as: "group",
      onDelete: "CASCADE",
    });
  }

  return member;
}