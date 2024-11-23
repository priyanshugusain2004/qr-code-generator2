const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const QRCode = require('./models/QRCode');
const qrcode = require('qrcode');

const app = express();
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors()); // Add this line
app.use(bodyParser.json());

// Create a QR code route
app.post('/api/qrcode', async (req, res) => {
  try {
    const qrcodeData = req.body.data;
    const qrImageData = await qrcode.toDataURL(qrcodeData);
    
    const newQRCode = new QRCode({ data: qrcodeData });
    await newQRCode.save();
    
    res.json({ qrImageData, message: 'QR Code generated successfully!' });
  } catch (error) {
    res.status(500).send('Error generating QR Code');
  }
});

// Other routes...

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
