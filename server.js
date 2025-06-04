const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let yayınBaşlangıç = null;

app.use(express.json());

// Yayın başlat endpoint'i
app.post('/start', (req, res) => {
  if (!yayınBaşlangıç) {
    yayınBaşlangıç = new Date();
  }
  res.json({ message: 'Yayın başlatıldı', start: yayınBaşlangıç });
});

// Yayın durdur endpoint'i (manuel)
app.post('/stop', (req, res) => {
  yayınBaşlangıç = null;
  res.json({ message: 'Yayın durduruldu' });
});

// Sayaç için kalan süreyi hesapla
app.get('/status', (req, res) => {
  if (!yayınBaşlangıç) {
    return res.json({ active: false });
  }
  const now = new Date();
  const diffMs = now - yayınBaşlangıç;
  res.json({ active: true, elapsedMs: diffMs });
});

app.listen(port, () => {
  console.log(`Yayın sayacı server ${port} portunda çalışıyor.`);
});
