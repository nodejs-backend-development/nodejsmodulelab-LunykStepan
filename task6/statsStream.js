const { Transform } = require('stream');

class StatsStream extends Transform {

    _transform(chunk, encoding, callback) {

        const text = chunk.toString().trim();

        const characters = text.length;

        const words = text
            .split(/\s+/)
            .filter(word => word.length > 0).length;

        console.log('\n=== TEXT ===');
        console.log(text);

        console.log('\n=== STATISTICS ===');
        console.log(`Words: ${words}`);
        console.log(`Characters: ${characters}`);

        this.push(text);

        callback();

        process.exit();
    }
}

const statsStream = new StatsStream();

console.log('Enter text:');

process.stdin.pipe(statsStream);