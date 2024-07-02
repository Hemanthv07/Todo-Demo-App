const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const cors = require('cors')



// middleware
app.use(cors());
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
const port = 5000;

const start = async () => {
  try {
    await connectDB('mongodb+srv://hemanthkumar96333:amazon123@cluster0.6yteyla.mongodb.net/?');
    console.log("Connected to database ....")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
