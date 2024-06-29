const express = require('express');
const router = express.Router();
const { users } = require('./models');

router.get('/users', (req, res) => {
  return res.json(users);
});

router.post('/users', (req, res) => {
  const { name, friend } = req.body;
  const id = users[users.length - 1].id + 1;
  const newUser = { id, name, friends: [friend] }; 
  name ? users.push(newUser) : null;
  console.log("User Added", users);
  return res.status(201).json(newUser);
});

router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, friend } = req.body;
  const user = users.find(user => user.id === parseInt(id));
  if (user) {
    name ? user.name = name : null
    friend ? user.friends = friend : null
    return res.json(user);
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index !== -1) {
    const deleteUser = users.splice(index, 1);
    console.log('Deleted User', deleteUser);
    return res.status(204).end();
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
