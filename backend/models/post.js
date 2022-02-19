module.exports = function(sequelize, DataTypes) {
  const post = sequelize.define('POST', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'RESTRICT'
    });

    post.belongsTo(models.GROUP, {
      foreignKey: 'groupId',
      as: 'group',
      onDelete: 'RESTRICT'
    });

    post.hasMany(models.COMMENT, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "RESTRICT",
    });
    post.hasMany(models.FILE, {
      foreignKey: "postId",
      as: "files",
      onDelete: "RESTRICT",
    });
  }

  return post;
}