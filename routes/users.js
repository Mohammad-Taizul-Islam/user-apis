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

module.exports = router;