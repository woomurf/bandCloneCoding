module.exports = function(sequelize, DataTypes) {
  const post = sequelize.define('POST', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    like: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    view: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

  post.associate = function(models) {
    post.belongsTo(models.USER, {
      as: 'user',
      onDelete: 'RESTRICT'
    });

    post.belongsTo(models.GROUP, {
      as: 'group',
      onDelete: 'RESTRICT'
    });
  }

  return post;
}