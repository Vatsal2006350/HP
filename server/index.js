const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const achievementsRoutes = require('./routes/achievements');

// connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/achievements', achievementsRoutes);

// basic route
app.get('/', (req, res) => {
  res.send('Achievement NFT API is running');
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 