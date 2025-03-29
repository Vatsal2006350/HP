const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const achievementsRoutes = require('./routes/achievements');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {
  res.send('api is running');
});

app.use('/api/achievements', achievementsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 