const { DataTypes } = require('sequelize');
const { toWIB } = require('../utils/waktu');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    nim: { type: DataTypes.STRING(14), unique: true },
    nama: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    kata_sandi: { type: DataTypes.STRING(255), allowNull: false },
    peran: { 
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: { isIn: [['pengelola', 'pengguna']] }
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
    tableName: 'users',
    timestamps: false,
  });

  return User;
};
