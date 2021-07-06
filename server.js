const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const messages = ["Hello", "World"]

let gameState = ""

const users = [{
    name: "Maxim",
    favourites: ["Cinderella", "Star Wars"]
}, {
    name: "Doven",
    favourites: ["Ice Princess", "Transformers"]
}]

let APIResult = {}

async function getEmployee() {
    APIResult = await axios.get("http://dummy.restapiexample.com/api/v1/employee/1")
    console.log(APIResult)
}

//getEmployee()

app.post("/", (req, res) => {
    for (const [key, value] of Object.entries(req.body)) {
        res.write(`<p>${key}: <strong>${value}</strong></p>`)
    }
    res.end()
})

app.get("/users", (req, res) => {
    res.json(users)
})

// Receive POST request
app.post("/users", (req, res) => {
    console.log(req.body)
    users.push({name: req.body.name, favourites: [req.body.favourites]})
    res.redirect("/users")
})

app.get("/users/:name", (req, res) => {
    const foundUser = users.find(user => user.name == req.params.name)
    res.json(foundUser)
})

app.get("/search", (req, res) => {
    res.json({result: `Are you looking for ${req.query.q}?`})
})

app.route("/about").get((request, response) => {
    response.send(`
        <h1>Welcome Express</h1>
    `)
})

app.get("/api", (req, res) => {
    res.send(`
        <h1>${APIResult.employee_name}</h1>
        <p>Salary: ${APIResult.employee_salary}</p>
    `)
})

app.get("/", (req, res) => {
    res.send(`
        <form method="POST" action="/users">
            <div>
                Name:
                <input type="text" name="name">
            </div>
            <div>
                Favourites:
                <input type="text" name="favourites">
            </div>
            <input type="submit">
        </form>
    `)
})

app.get("/game", (req, res) => {
    res.json(gameState)
})

app.post("/game", (req, res) => {
    console.log("receive game", req.body)
    gameState = req.body
    res.json(gameState)
})

// start the server / wait for requests on port 8080
const port = process.env.PORT || process.argv[2] || 8080
app.listen(port, () => console.log("server started on port " + port))