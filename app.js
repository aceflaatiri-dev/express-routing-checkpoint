// Import des modules
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware cool pour vérifier si on est dans les heures d'ouverture

app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();   // 0 = dimanche, 1 = lundi, ..., 6 = samedi
  const hour = now.getHours(); // heure actuelle

  // Si c'est weekend ou hors 9h-17h, on ferme la boutique
  if (day === 0 || day === 6 || hour < 9 || hour >= 17) {
    return res.send('<h1>Désolé, on est ouvert seulement du lundi au vendredi de 9h à 17h 😅</h1>');
  }

  // Sinon, go next middleware / route
  next();
});

// Routes principales
app.get('/', (req, res) => {
  // Page d'accueil
  res.sendFile(path.resolve('views', 'home.html'));
});

app.get('/services', (req, res) => {
  // Page "Nos services"
  res.sendFile(path.resolve('views', 'services.html'));
});

app.get('/contact', (req, res) => {
  // Page "Contactez-nous"
  res.sendFile(path.resolve('views', 'contact.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Le serveur tourne sur http://localhost:${PORT} !`);
});
