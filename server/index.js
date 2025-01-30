// This file serves as the entry point to our server
require('dotenv').config();
const app = require('./server');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
