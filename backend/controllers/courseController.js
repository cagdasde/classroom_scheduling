// backend/controllers/courseController.js
const db = require('../db');

// Tüm dersleri listele
exports.getAllCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      console.error('Dersler getirilirken hata:', err);
      return res.status(500).send('Sunucu hatası');
    }
    res.json(results);
  });
};

// Yeni ders ekle
exports.addCourse = (req, res) => {
  const { name, hours_per_week } = req.body;
  const query = 'INSERT INTO courses (name, hours_per_week) VALUES (?, ?)';

  db.query(query, [name, hours_per_week], (err, results) => {
    if (err) {
      console.error('Ders eklenirken hata:', err);
      return res.status(500).send('Sunucu hatası');
    }
    res.status(201).send('Ders başarıyla eklendi');
  });
};
