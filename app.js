const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware pour servir les fichiers CSS
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier les horaires (Lun-Ven, 9h-17h)
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const hour = now.getHours();

  if (day === 0 || day === 6 || hour < 9 || hour >= 17) {
    return res.send('<h1>Notre site est disponible uniquement du lundi au vendredi, de 9h à 17h.</h1>');
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// Serveur
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
