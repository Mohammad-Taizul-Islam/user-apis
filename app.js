const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// In-memory "database" for users
let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA',
    company: 'ABC Corp',
    title: 'Software Engineer',
    website: 'https://johndoe.com',
  },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// CREATE a new user
app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    company: req.body.company,
    title: req.body.title,
    website: req.body.website,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE a user by ID
app.put('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.address = req.body.address;
  user.city = req.body.city;
  user.state = req.body.state;
  user.zip = req.body.zip;
  user.country = req.body.country;
  user.company = req.body.company;
  user.title = req.body.title;
  user.website = req.body.website;

  res.json(user);
});

// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});