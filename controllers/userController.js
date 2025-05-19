const { User } = require('../models');

// GET pengguna by NIM
exports.getPenggunaByNim = async (req, res) => {
  try {
    const { nim } = req.params;
    const user = await User.findOne({ where: { nim } });

    if (!user) {
      return res.status(404).json({ error: 'Pengguna dengan NIM tersebut tidak ditemukan' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengguna berdasarkan NIM', detail: error.message });
  }
};

// GET semua pengguna
exports.getAllPengguna = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengguna', detail: error.message });
  }
};

// GET pengguna by ID
exports.getPenggunaById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengguna', detail: error.message });
  }
};

// POST pengguna baru
exports.createPengguna = async (req, res) => {
  try {
    const { nim, nama, email, kata_sandi, peran } = req.body;
    if (!nim || !nama || !email || !kata_sandi || !peran) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    const user = await User.create({ nim, nama, email, kata_sandi, peran });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat pengguna', detail: error.message });
  }
};

// PUT update pengguna
exports.updatePengguna = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    const { nim, nama, email, kata_sandi, peran } = req.body;

    user.nim = nim ?? user.nim;
    user.nama = nama ?? user.nama;
    user.email = email ?? user.email;
    user.kata_sandi = kata_sandi ?? user.kata_sandi;
    user.peran = peran ?? user.peran;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui pengguna', detail: error.message });
  }
};

// DELETE pengguna
exports.deletePengguna = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    await user.destroy();
    res.json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus pengguna', detail: error.message });
  }
};
