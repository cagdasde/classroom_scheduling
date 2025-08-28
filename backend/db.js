// backend/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ← şifren varsa buraya yaz
  database: 'class_schelude'
  
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err);
    return;
  }
  console.log('MySQL bağlantısı başarılı.');
});

module.exports = connection;
