const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const server = http.createServer((req, res) => {

    console.log('\n=== New Connection ===');

    if (req.method === 'POST') {

        console.log('Receiving compressed file...');

        const gunzip = zlib.createGunzip();

        const writeStream = fs.createWriteStream('uploads/received.txt');

        req.pipe(gunzip).pipe(writeStream);

        writeStream.on('finish', () => {

            console.log('File extracted successfully');
            console.log('Saved to uploads/received.txt');

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File uploaded successfully');
        });

    } else {

        res.writeHead(404);
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});