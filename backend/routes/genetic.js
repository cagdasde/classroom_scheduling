const express = require('express');
const router = express.Router();
const db = require('../db'); // Veritabanı bağlantısı

router.get('/generateSchedule', async (req, res) => {
  try {
    const [courses] = await db.promise().query('SELECT * FROM courses');
    const [classrooms] = await db.promise().query('SELECT * FROM classrooms');

    // Programı oluşturma
    const schedule = await generateSchedule(courses, classrooms);
    res.json(schedule);  // schedule verisini frontend'e gönderiyoruz
  } catch (err) {
    console.error('Genetik algoritma verilerini çekerken hata:', err);
    res.status(500).send('Sunucu hatası');
  }
});

async function generateSchedule(courses, classrooms) {
  let population = initializePopulation(courses, classrooms);
  evaluatePopulation(population);

  // Genetik algoritma döngüsü
  for (let generation = 0; generation < 100; generation++) {
    let selectedParents = selectParents(population);
    let offspring = crossover(selectedParents);
    mutate(offspring);
    population = createNewPopulation(offspring);
    evaluatePopulation(population);

    if (isValidSchedule(population)) {
      break;
    }
  }

  return population[0];  // En iyi programı frontend'e döndürüyoruz
}

function initializePopulation(courses, classrooms) {
  let population = [];

  for (let i = 0; i < 10; i++) {  // 10 farklı program yaratılıyor
    let schedule = [];

    courses.forEach(course => {
      let weeklyHours = course.weekly_hours;
      let preferredDays = parseJson(course.preferred_days);
      let preferredTimeSlots = parseJson(course.preferred_time_slots);
      let requiredEquipment = course.equipment_needed?.split(',') || [];
      let requiredCapacity = course.required_capacity;

      for (let h = 0; h < weeklyHours; h++) {
        let day = getRandomDay(preferredDays);
        let time = getRandomTimeSlot(preferredTimeSlots);

        // Uygun sınıfları filtrele
        let suitableClassrooms = classrooms.filter(room => {
          let roomEquipment = room.equipment_available?.split(',') || [];
          let hasEquipment = requiredEquipment.every(eq => roomEquipment.includes(eq));
          return room.capacity >= requiredCapacity && hasEquipment;
        });

        let classroom = suitableClassrooms.length > 0
          ? suitableClassrooms[Math.floor(Math.random() * suitableClassrooms.length)].name
          : classrooms[Math.floor(Math.random() * classrooms.length)].name;

        schedule.push({
          course: course.name,
          classroom,
          day,
          time
        });
      }
    });

    population.push(schedule);
  }

  return population;
}

// Verilen veri JSON formatında ise onu döndürür, değilse boş dizi döner
function parseJson(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('JSON.parse hatası:', e);
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
}

function getRandomDay(preferredDays) {
  return preferredDays.length > 0
    ? preferredDays[Math.floor(Math.random() * preferredDays.length)]
    : `Day ${Math.floor(Math.random() * 5) + 1}`;
}

function getRandomTimeSlot(preferredTimeSlots) {
  return preferredTimeSlots.length > 0
    ? preferredTimeSlots[Math.floor(Math.random() * preferredTimeSlots.length)]
    : `${Math.floor(Math.random() * 8) + 8}:00`;
}

function evaluatePopulation(population) {
  population.forEach(schedule => {
    schedule.fitness = 0;
    let seen = {};
    schedule.forEach(entry => {
      let key = `${entry.day}-${entry.time}-${entry.classroom}`;
      if (seen[key]) {
        schedule.fitness -= 10; // Çakışma cezası
      } else {
        seen[key] = true;
      }
    });
  });
}

function selectParents(population) {
  return population
    .sort((a, b) => b.fitness - a.fitness)
    .slice(0, 5);  // En iyi 5 birey
}

function crossover(parents) {
  let offspring = [];

  for (let i = 0; i < parents.length - 1; i++) {
    let parent1 = parents[i];
    let parent2 = parents[i + 1];

    let midpoint = Math.floor(parent1.length / 2);
    let child = parent1.slice(0, midpoint).concat(parent2.slice(midpoint));
    offspring.push(child);
  }

  return offspring;
}

function mutate(offspring) {
  offspring.forEach(schedule => {
    let index = Math.floor(Math.random() * schedule.length);
    schedule[index].time = `${Math.floor(Math.random() * 8) + 8}:00`;  // Zaman dilimi mutasyonu
  });
}

function createNewPopulation(offspring) {
  return [...offspring];
}

function isValidSchedule(population) {
  return true; // Henüz gelişmiş doğrulama yapılmadı
}

module.exports = router;
