

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);


const express = require('express');

const app = express();


app.use(express.json());


const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Brad' },
        { id: 3, name: 'Jane' }
    ];
    res.json(users);

});

app.post('/api/users', (req, res) => {
    console.log(req.body); // Log the request body
    const newUser = {
      id: 3,
      name: req.body.name || 'New User',
    };
    res.status(201).json(newUser);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ://localhost:${PORT}`);
});