/* eslint-disable no-underscore-dangle */
// Pastikan path di bawah ini sama dengan nama file di sidebar (gacha-model atau gatcha-model)
const { Gacha, Hadiah } = require('./gacha-model');

async function kocokGacha(req, res) {
  try {
    const { userId } = req.body;

    // A. CEK LIMIT 5X SEHARI
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);
    const jumlahMain = await Gacha.countDocuments({
      userId,
      tanggal: { $gte: hariIni },
    });

    if (jumlahMain >= 5) {
      return res
        .status(403)
        .json({ status: 'fail', message: 'Limit harian habis (Maks 5x)' });
    }

    // B. LOGIC HADIAH RANDOM & CEK STOK
    const listHadiah = await Hadiah.find({
      $expr: { $lt: ['$terpakai', '$kuota'] },
    });
    let wonPrize = 'Zonk (Coba lagi)';

    if (listHadiah.length > 0 && Math.random() < 0.3) {
      const randomItem =
        listHadiah[Math.floor(Math.random() * listHadiah.length)];
      wonPrize = randomItem.nama;

      // C. KURANGI KUOTA
      await Hadiah.updateOne(
        { _id: randomItem._id },
        { $inc: { terpakai: 1 } }
      );
    }

    // D. SIMPAN HISTORY
    const record = new Gacha({ userId, hadiah: wonPrize });
    await record.save();

    return res.status(200).json({
      status: 'success',
      data: { hadiah: wonPrize, sisa_kuota: 4 - jumlahMain },
    });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { kocokGacha };
