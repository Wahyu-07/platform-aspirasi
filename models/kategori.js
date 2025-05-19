const { Sequelize, DataTypes } = require('sequelize');

// Mendefinisikan model Kategori
module.exports = (sequelize) => {
  const Kategori = sequelize.define('Kategori', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING(20), // Sesuai dengan definisi VARCHAR(20)
      allowNull: false,
      unique: true,
      validate: {
        isIn: [[
          'Akademik',
          'Fasilitas',
          'Pelayanan',
          'Administrasi',
          'Keamanan',
          'Kegiatan Kampus',
          'Lainnya'
        ]],
      }
    },
  }, {
    tableName: 'kategori',
    timestamps: false,
  });

  Kategori.associate = (models) => {
    Kategori.hasMany(models.Postingan, {
      foreignKey: 'id_kategori',
      as: 'postingan',
    });
  };

  return Kategori;
};
