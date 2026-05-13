const http = require('http');

const server = http.createServer((req, res) => {

    console.log('\n=== New Request ===');
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.url}`);
    console.log(`Time: ${new Date().toLocaleString()}`);

    const fullUrl = new URL(req.url, 'http://localhost:3000');

    const name = fullUrl.searchParams.get('name');

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (name) {

        console.log(`Name parameter: ${name}`);

        res.end(`Hello ${name}`);

    } else {

        console.log('No name parameter');

        res.end('You should provide name parameter');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});