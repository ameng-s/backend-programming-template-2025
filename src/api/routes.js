const express = require('express');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  // 1. Jalankan route bawaan dosen
  books(app);
  users(app);

  // 2. Route Login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({
        status: 'success',
        message: 'Login Berhasil',
      });
    }
    return res.status(401).json({
      status: 'fail',
      message: 'Gagal Login',
    });
  });

  // 3. Route Gacha
  app.post('/gacha', async (req, res) => {
    try {
      const { userId } = req.body;
      const userGachaCount = 0; // Simulasi: ganti dengan query DB jika perlu

      if (userGachaCount >= 5) {
        return res.status(400).json({
          status: 'fail',
          message: 'Kuota gacha harian habis!',
        });
      }

      const rand = Math.random();
      let wonPrize = 'Zonk (Coba lagi)';

      // Logika Penentuan Hadiah (Sesuai probabilitas)
      if (rand < 0.01) wonPrize = 'Emas 10 gram';
      else if (rand < 0.06) wonPrize = 'Smartphone X';
      else if (rand < 0.16) wonPrize = 'Smartwatch Y';
      else if (rand < 0.36) wonPrize = 'Voucher Rp100.000';
      else if (rand < 0.86) wonPrize = 'Pulsa Rp50.000';

      // Menggunakan userId agar tidak error 'unused variable'
      console.log(`User ${userId} sedang melakukan gacha...`);

      return res.status(200).json({
        status: 'success',
        message:
          wonPrize === 'Zonk (Coba lagi)'
            ? 'Maaf, belum beruntung'
            : `Selamat! Menang ${wonPrize}`,
        data: { hadiah: wonPrize },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        message: err.message,
      });
    }
  });

  return app;
};
