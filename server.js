// import predefined http module from node
const http = require('http');

// listener that waits for requests
const server = http.createServer((request, response) => {
    response.write("<h1>Hello Browser</h1>")
    response.end()
})

// start the server / wait for requests on port 8080
server.listen(process.env.PORT || 8080)