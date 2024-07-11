const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors()); // Use cors middleware

// Other middleware and configurations
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dk@9545dk',
  database: 'myapp'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL connected. succesFully .......');
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id: result.insertId, name, email });
  });
});

// Get all users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

// Update a user

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  // Ensure name and email are strings before passing to query
  if (typeof name !== 'string' || typeof email !== 'string') {
    return res.status(400).send('Invalid name or email format.');
  }

  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Error updating user.');
    }
    res.send({ id, name, email });
  });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id });
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
