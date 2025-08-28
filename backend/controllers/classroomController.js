exports.addClassroom = (req, res) => {
  const { name, capacity, equipment } = req.body;

  // equipment JSON string olarak saklanacak
  const equipmentStr = equipment ? JSON.stringify(equipment) : null;

  const query = 'INSERT INTO classrooms (name, capacity, equipment) VALUES (?, ?, ?)';

  db.query(query, [name, capacity, equipmentStr], (err, results) => {
    if (err) {
      console.error('Sınıf eklenirken hata:', err);
      return res.status(500).send('Sunucu hatası');
    }
    res.status(201).send('Sınıf başarıyla eklendi');
  });
};
