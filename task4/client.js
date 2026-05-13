const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

console.log('Reading file...');

const readStream = fs.createReadStream('test.txt');

console.log('Compressing file...');

const gzip = zlib.createGzip();

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'POST',
    headers: {
        'Content-Encoding': 'gzip'
    }
};

console.log('Sending file to server...');

const req = http.request(options, (res) => {

    console.log(`STATUS: ${res.statusCode}`);

    res.on('data', (chunk) => {
        console.log(chunk.toString());
    });
});

readStream.pipe(gzip).pipe(req);