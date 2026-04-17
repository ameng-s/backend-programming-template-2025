const express = require('express');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gacha = require('./components/gatcha/gacha.route');

module.exports = () => {
  const app = express.Router();

  // 1. Jalankan route bawaan template
  books(app);
  users(app);

  // 2. Jalankan route gacha (Logic-nya udah ada di controller gacha)
  gacha(app);

  // 3. Tambahan Route Login (Kalau mau buat bukti screenshot login)
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      return res
        .status(200)
        .json({ status: 'success', message: 'Login Berhasil' });
    }
    return res.status(401).json({ status: 'fail', message: 'Gagal Login' });
  });

  return app;
};
