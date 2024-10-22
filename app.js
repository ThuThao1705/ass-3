const express = require('express');
require('./db');  // Import the database connection
const studentRoutes = require('./routes/studentRoutes');
 // Import student routes

const app = express();
app.use(express.json());

// Info endpoint
app.get('/info', (req, res) => {
  res.json({
    data: {
      fullName: "Nguyen Van A",
      studentCode: "QNUO1234"
    }
  });
});

// Use student routes
app.use('/students', studentRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
