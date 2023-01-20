const express = require('express');
const controller = require('./controller');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.end('Hello Jayden');
// });

router.get('/app', controller.getIndex);

router.get('/porns', (req, res) => {
  const pornArr = ['Jayden James', 'Alexis Texas', 'Ariella Ferrera'];
  res.end(JSON.stringify(pornArr));
});

module.exports = router;
