// import predefined http module from node
const http = require('http')

const messages = ["Hello", "World"]

let APIResult = {}

http.request("http://dummy.restapiexample.com/api/v1/employee/1", response => {
    let res = ''

    response.on('data', chunk => {
        res += chunk
    })

    response.on('end', () => {
        APIResult = JSON.parse(res).data
        console.log(APIResult.employee_name)
    })
}).end()

// request callback function
function processRequest(request, response) {
    response.setHeader('Content-Type', 'text/html');
    if(request.url == "/about"){
        response.write(`
            <h1>About</h1>
            <p>Node server by Maxim</p>
        `)
    } else if(request.url == "/api") {
        response.write(`
            <h1>${APIResult.employee_name}</h1>
            <p>Salary: ${APIResult.employee_salary}</p>
        `)
    } else {
        const newMessage = request.url.split("=")[1]
        if(newMessage){
            messages.push(newMessage.replace(/\+/g, " "))
        } 
        response.write(`
            <form method="GET" action="/">
                <input type="text" name="message">
            </form>
        `)
        messages.forEach(m => {
            response.write(`<p>${m}</p>`)
        })
    }
    
    response.end()
}

// listener that waits for requests
const server = http.createServer(processRequest)

// start the server / wait for requests on port 8080
const port = process.env.PORT || process.argv[2] || 8080
server.listen(port, null, () => console.log("server started on port " + port))