const express = require('express')
const app = express()
const port = 4000
const mysql = require('mysql')

// DYNAMIC DATA ROUTES

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express-company'
})


app.get('/api/v2/users', (req, res) => {
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
            return res.json(result);
        });
    });
    const errorMessage = {message:"There is an issue, please check"};
    return res.json(errorMessage);
})
app.get('/api/v2/users/:userid', (req, res) => {
    const id = Number(req.params.userid);
    
    connection.connect(function(err,sql) {

        if (err) throw err;
        var sql = "SELECT * FROM users where `id` = ?";
        connection.query(sql,[id], function (err, result, fields) {
            if (err) throw err;
            return res.json(result);
        });
    });
    const errorMessage = {message:"No details found, please check"};
    return res.json(errorMessage);
})

// STATIC DATA ROUTES

const users = require('./public/users.json');
// web routes
app.get('/', (req, res) => {
  res.send('Hello Express API!')
})
app.get('/users', (req, res) => {
    const html = `
        <h2>User List</h2>
        <table style="border-left:1px solid #ddd;border-top:1px solid #ddd">
            <tr><th style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px;text-align:left">Name</th><th style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px;text-align:left">Profession</th><th style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px;text-align:left">Country</th></tr>
            ${users.map((user) => `<tr><td style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px">&diams; ${ user.first_name } ${ user.last_name }</td><td style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px">${ user.profession }</td><td style="border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:5px"> ${ user.country }</td></tr>`).join("")}
        </table>
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