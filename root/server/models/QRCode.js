const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  data: String,
});

module.exports = mongoose.model('QRCode', QRCodeSchema);
