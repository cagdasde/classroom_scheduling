const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const courseRoutes = require("./routes/courses");
const classroomsRouter = require("./routes/classrooms");
const geneticRouter = require('./routes/genetic');


app.use(cors());
app.use(bodyParser.json());

// API endpointleri
app.use("/api/courses", courseRoutes);
app.use("/api/classrooms", classroomsRouter);
app.use('/api/genetic', geneticRouter);

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda çalışıyor");
});
