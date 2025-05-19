const { Sequelize } = require('sequelize');
const sequelize = require('../config/db');

// Import model dengan memanggil fungsi ekspor yang menerima instance sequelize
const User = require('./user')(sequelize);
const Kategori = require('./kategori')(sequelize);
const Postingan = require('./postingan')(sequelize);
const Komentar = require('./komentar')(sequelize);
const Interaksi = require('./interaksi')(sequelize);

// Definisikan relasi antar model
User.hasMany(Postingan, { foreignKey: 'id_penulis', as: 'postingan' });
Postingan.belongsTo(User, { foreignKey: 'id_penulis', as: 'penulis' });

Kategori.hasMany(Postingan, { foreignKey: 'id_kategori', as: 'postingan' });
Postingan.belongsTo(Kategori, { foreignKey: 'id_kategori', as: 'kategori' });

Postingan.hasMany(Komentar, { foreignKey: 'id_postingan', as: 'komentar' });
Komentar.belongsTo(Postingan, { foreignKey: 'id_postingan', as: 'postingan' });

User.hasMany(Komentar, { foreignKey: 'id_penulis', as: 'komentar' });
Komentar.belongsTo(User, { foreignKey: 'id_penulis', as: 'penulis' });

User.hasMany(Interaksi, { foreignKey: 'id_pengguna', as: 'interaksi' });
Interaksi.belongsTo(User, { foreignKey: 'id_pengguna', as: 'pengguna' });

Postingan.hasMany(Interaksi, { foreignKey: 'id_postingan', as: 'interaksiPost' });
Interaksi.belongsTo(Postingan, { foreignKey: 'id_postingan', as: 'postingan' });

Komentar.hasMany(Interaksi, { foreignKey: 'id_komentar', as: 'interaksi' });
Interaksi.belongsTo(Komentar, { foreignKey: 'id_komentar', as: 'komentar' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Kategori,
  Postingan,
  Komentar,
  Interaksi,
};
