const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Example API Endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
