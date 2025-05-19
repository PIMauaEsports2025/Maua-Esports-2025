const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

const DB_FILE = './users.json';

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    res.json(data.users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    const user = data.users.find(user => user._id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read database' });
  }
});

// Create new user
app.post('/api/users', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    const newUser = req.body;
    
    // Generate new ID (simple approach)
    const maxId = Math.max(...data.users.map(user => parseInt(user._id)), 0);
    newUser._id = String(maxId + 1);
    
    data.users.push(newUser);
    data.lastUpdate = new Date().toISOString();
    
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    const index = data.users.findIndex(user => user._id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    data.users[index] = { ...req.body, _id: req.params.id };
    data.lastUpdate = new Date().toISOString();
    
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json(data.users[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE));
    const index = data.users.findIndex(user => user._id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    data.users.splice(index, 1);
    data.lastUpdate = new Date().toISOString();
    
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Acesse usando: http://<IP-DO-SERVIDOR>:${PORT}`);
});