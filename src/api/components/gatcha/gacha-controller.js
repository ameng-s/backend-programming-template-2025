/* eslint-disable no-underscore-dangle */
const historyGacha = [];
const daftarHadiah = [
  { nama: 'Emas 10 gram', kuota: 1, terpakai: 0 },
  { nama: 'Smartphone X', kuota: 5, terpakai: 0 },
  { nama: 'Smartwatch Y', kuota: 10, terpakai: 0 },
  { nama: 'Voucher Rp100.000', kuota: 100, terpakai: 0 },
  { nama: 'Pulsa Rp50.000', kuota: 500, terpakai: 0 },
];

async function kocokGacha(req, res) {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId wajib diisi' });

    const userPlays = historyGacha.filter((h) => h.userId === userId);
    if (userPlays.length >= 5) {
      return res
        .status(403)
        .json({ status: 'fail', message: 'Limit harian habis (Maks 5x)' });
    }

    const hadiahTersedia = daftarHadiah.filter((h) => h.terpakai < h.kuota);
    let hasil = 'Zonk (Coba lagi)';

    if (hadiahTersedia.length > 0 && Math.random() < 0.5) {
      const randomIdx = Math.floor(Math.random() * hadiahTersedia.length);
      const item = hadiahTersedia[randomIdx];
      hasil = item.nama;
      item.terpakai += 1;
    }

    historyGacha.push({ userId, hadiah: hasil, tanggal: new Date() });
    return res.status(200).json({
      status: 'success',
      data: { userId, hadiah: hasil, sisa_kesempatan: 4 - userPlays.length },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { kocokGacha };
