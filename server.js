// import predefined http module from node
const http = require('http');

const messages = ["Hello", "World"]

// listener that waits for requests
const server = http.createServer((request, response) => {

    const newMessage = request.url.split("=")[1]
    if(newMessage){
        messages.push(newMessage.replace(/\+/g, " "))
    } 
    response.setHeader('Content-Type', 'text/html');
    response.write(`
        <form method="GET" action="/">
            <input type="text" name="message">
        </form>
    `)
    messages.forEach(m => {
        response.write(`<p>${m}</p>`)
    })
    response.end()
})

// start the server / wait for requests on port 8080
server.listen(process.env.PORT || 8080)