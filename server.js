const express = require('express');
const app = express();

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
  console.log(`Express server listening on Port ${PORT}`);
});
