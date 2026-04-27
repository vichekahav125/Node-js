import express from 'express';
import db from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});


// LIST USERS (MYSQL)
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// CREATE USER (MYSQL)
app.post('/users', (req, res) => {
  const name = req.body.name;

  db.query(
    'INSERT INTO users (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: result.insertId,
        name: name
      });
    }
  );
});

// UPDATE USER (MYSQL)

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;

  db.query(
    'UPDATE users SET name = ? WHERE id = ?',
    [name, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ id, name });
    }
  );
});

// DELETE USER (MYSQL)
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  db.query(
    'DELETE FROM users WHERE id = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    }
  );
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});