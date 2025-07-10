const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve the locales directory statically
app.use('/locales', express.static(path.join(__dirname, 'locales')));

app.get('/locales/:lang', (req, res) => {
  const lang = req.params.lang;
  const filePath = path.join(__dirname, 'locales', `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Language not supported' });
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'File not found' });
    }
    try {
      const json = JSON.parse(data);
      res.json(json);
    } catch (e) {
      res.status(500).json({ error: 'Invalid JSON' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Localization API running on http://localhost:${PORT}`);
});
