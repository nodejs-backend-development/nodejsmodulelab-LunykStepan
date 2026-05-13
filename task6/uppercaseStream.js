const { Transform } = require('stream');

class UppercaseStream extends Transform {

    _transform(chunk, encoding, callback) {

        const text = chunk.toString();

        let result = '';

        for (const char of text) {

            if (isNaN(char) || char === ' ') {
                result += char.toUpperCase();
            } else {
                result += char;
            }
        }

        console.log('\nResult:');
        console.log(result);

        this.push(result);

        callback();

        process.exit();
    }
}

const upperStream = new UppercaseStream();

console.log('Enter text:');

process.stdin.pipe(upperStream);