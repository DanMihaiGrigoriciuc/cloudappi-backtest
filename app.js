const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 8031;
var app = express();


app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

var users = [{
    id: 1,
    firstname: "Dan Mihai",
    lastname: "Grigoriciuc",
    email: "dan.grig@gmail.com",
    birthDate: "1974-06-01",
    address: {
        id: 1,
        street: "4, Mayor",
        city: "Madrid",
        country: "SP",
        postalcode: "28200"
    }
}]

app.get("/users", (req, res, next) => {
    res.json(users);
});
app.get("/users/:userId", (req, res, next) => {
    let found = users.find(user => user.id == req.params.userId);
    if (!found) {
        res.status(404).send();
        return;
    }
    res.json(found);
});
app.post("/users", (req, res, next) => {
    var user = req.body;
    let nextId = users.length + 1;
    user.id = nextId;
    user.address.id = nextId;
    users.push(user);
    res.status(201).json(user);
});
app.put("/users/:userId", (req, res, next) => {
    let found = users.find(user => user.id == req.params.userId);
    if (!found) {
        res.status(404).send();
        return;
    }
    var newUser = req.body;
    newUser.id = found.id;
    for (let i = 0; i < users.length; i++) {
        if (found.id == users[i].id) {
            users[i] = newUser;
            res.json(newUser);
            return;
        }
    }
});
app.delete("/users/:userId", (req, res, next) => {
    let found = users.find(user => user.id == req.params.userId);
    if (!found) {
        res.status(404).send();
        return;
    }
    users = users.filter(user => user.id != found.id);
    res.send();
});