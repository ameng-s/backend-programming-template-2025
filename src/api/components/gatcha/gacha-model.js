const mongoose = require('mongoose');

const gachaSchema = new mongoose.Schema({
  userId: String,
  hadiah: String,
  tanggal: { type: Date, default: Date.now },
});

const hadiahSchema = new mongoose.Schema({
  nama: String,
  kuota: Number,
  terpakai: { type: Number, default: 0 },
});

const Gacha = mongoose.model('Gacha', gachaSchema);
const Hadiah = mongoose.model('Hadiah', hadiahSchema);

module.exports = { Gacha, Hadiah };
