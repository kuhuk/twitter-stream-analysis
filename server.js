const http = require('http');
const server = http.createServer((req,res) => {
        res.end('Hello World...\n');
});

server.listen(4545, () => {
    console.log('Server is running...');
});