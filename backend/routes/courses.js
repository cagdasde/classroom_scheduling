const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/courses — Tüm dersleri getir
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM courses");
    res.json(rows);
  } catch (err) {
    console.error("Dersleri getirirken hata:", err);
    res.status(500).send("Sunucu hatası");
  }
});

// POST /api/courses — Yeni ders ekle
router.post('/', async (req, res) => {
  try {
    const {
      name,
      code,
      instructor,
      weekly_hours,
      required_capacity,
      preferred_days,
      preferred_time_slots,
      equipment_needed
    } = req.body;

    if (!name || !code || !instructor) {
      return res.status(400).json({ error: 'name, code ve instructor zorunlu' });
    }

    const [result] = await db.promise().query(
      `INSERT INTO courses
      (name, code, instructor, weekly_hours, required_capacity, preferred_days, preferred_time_slots, equipment_needed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        code,
        instructor,
        weekly_hours,
        required_capacity,
        JSON.stringify(preferred_days),
        JSON.stringify(preferred_time_slots),
        equipment_needed
      ]
    );

    res.json({ success: true, courseId: result.insertId });
  } catch (err) {
    console.error('Course eklenirken hata:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


  // DELETE /api/courses/:id — Belirli bir dersi sil
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await db.promise().query("DELETE FROM courses WHERE id = ?", [id]);
      res.json({ message: "Ders silindi" });
    } catch (err) {
      console.error("Ders silinirken hata:", err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });
  
  // PUT /api/courses/:id — Belirli bir dersi güncelle
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, code, instructor } = req.body;
    try {
      await db
        .promise()
        .query(
          "UPDATE courses SET name = ?, code = ?, instructor = ? WHERE id = ?",
          [name, code, instructor, id]
        );
      res.json({ message: "Ders güncellendi" });
    } catch (err) {
      console.error("Ders güncellenirken hata:", err);
      res.status(500).json({ error: "Sunucu hatası" });
    }
  });
  

module.exports = router;
