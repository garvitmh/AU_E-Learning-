const http = require('http') //require('node:http')
let port = 8080;
let server = http.createServer((req,res)=>
{
    res.write("Hello world");
    res.end();
})

server.listen(port,()=>{
console.log(`server is running on ${port}`)
})