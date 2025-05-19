const { Sequelize, DataTypes } = require('sequelize');
const { toWIB } = require('../utils/waktu');

module.exports = (sequelize) => {
  const Interaksi = sequelize.define('Interaksi', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipe: {
      type: DataTypes.ENUM('upvote', 'downvote', 'lapor'),
      allowNull: false,
    },
    id_pengguna: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_postingan: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_komentar: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dibuat_pada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        const value = this.getDataValue('dibuat_pada');
        return toWIB(value);
      },
    },
  }, {
    tableName: 'interaksi',
    timestamps: false,
  });

  Interaksi.associate = (models) => {
    Interaksi.belongsTo(models.User, {
      foreignKey: 'id_pengguna',
      as: 'pengguna',
    });

    Interaksi.belongsTo(models.Postingan, {
      foreignKey: 'id_postingan',
      as: 'postingan',
    });

    Interaksi.belongsTo(models.Komentar, {
      foreignKey: 'id_komentar',
      as: 'komentar',
    });
  };

  return Interaksi;
};
