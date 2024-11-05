const express = require('express');
const app = express();
const port = 3000;

app.get('/status', (req, res) => {
  res.json({ status: 'API is running!' });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
