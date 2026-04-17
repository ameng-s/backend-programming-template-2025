/* eslint-disable */
const mongoose = require('mongoose');

// Mocking connection biar ga FATAL
const db = {
  once: (event, cb) => {
    if (event === 'open') cb();
  },
  on: () => {},
  model: () => ({}),
};

module.exports = {
  db,
  Gacha: { countDocuments: () => 0, save: () => {} },
  Hadiah: { find: () => [] },
};
