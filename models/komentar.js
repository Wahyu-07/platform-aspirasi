const { Sequelize, DataTypes } = require('sequelize');
const { toWIB } = require('../utils/waktu');

module.exports = (sequelize) => {
  const Komentar = sequelize.define('Komentar', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_postingan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_penulis: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    konten: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    anonim: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dibuat_pada: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
      get() {
        const value = this.getDataValue('dibuat_pada');
        return toWIB(value);
      }
    },
  }, {
    tableName: 'komentar',
    timestamps: false,
  });

  Komentar.associate = (models) => {
    Komentar.belongsTo(models.Postingan, {
      foreignKey: 'id_postingan',
      as: 'postingan',
    });

    Komentar.belongsTo(models.User, {
      foreignKey: 'id_penulis',
      as: 'penulis',
    });

    Komentar.hasMany(models.Interaksi, {
      foreignKey: 'id_komentar',
      as: 'interaksi',
    });
  };

  return Komentar;
};
