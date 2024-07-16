const express = require('express')
const app = express()
const port = 4000

const users = require('./public/users.json');

// web routes
app.get('/', (req, res) => {
  res.send('Hello Express API!')
})
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>&diams; ${ user.first_name } ${ user.last_name }</li>`).join("")}
        </ul>
    `;
    res.send(html);
  })

// api routes
app.get('/api/v1/users', (req, res) => {
    return res.json(users);
})
app.get('/api/v1/users/:userid', (req, res) => {
    const id = Number(req.params.userid);
    const user = users.find((user) => user.id == id);
    return res.json(user);
})
app.post('/api/v1/users', (req, res) => {
    // create new user here
    return res.json({ message: 'User created', status : 'Pending' });
})
app.patch('/api/v1/users/:userid', (req, res) => {
    // edit the user here
    return res.json({ message: 'User edited', status : "Edited" });
})
app.delete('/api/v1/users/:userid', (req, res) => {
    // delete the user here
    return res.json({ message: 'User deleted', status : "Deleted" });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})