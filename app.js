const express = require('express');
const app = express();
const port = 3240;

let users = [
    {
        id: 1,
        name: 'alice'
    },
    {
        id: 2,
        name: 'bak'
    },
    {
        id: 3,
        name: 'chris'
    }
]

app.get('/', (req, res) => {
  res.send('Hello World!\n');
 });

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({error: 'Incorrect id'});
    }
  
    let user = users.filter(user => user.id === id)[0]
    if (!user) {
      return res.status(404).json({error: 'Unknown user'});
    }  
    return res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({error: 'Incorrect id'});
    }
  
    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
      return res.status(404).json({error: 'Unknown user'});
    }
  
    users.splice(userIdx, 1);
    res.status(204).send();
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});