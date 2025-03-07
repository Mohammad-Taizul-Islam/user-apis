const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  res.json(users);
});

router.post('/', (req, res) => {
  const newUser = {
    id: 3,
    name: req.body.name || 'New User',
  };
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        name: req.body.name || 'Updated User',
    };
    res.json(user);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

module.exports = router;