// приклад node success error 123
const { Transform } = require('stream');

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

class HighlightStream extends Transform {

    constructor(keywords) {
        super();
        this.keywords = keywords;
    }

    _transform(chunk, encoding, callback) {

        let text = chunk.toString();

        for (const word in this.keywords) {

            const color = colors[this.keywords[word]];

            const regex = new RegExp(`\\b${word}\\b`, 'gi');

            text = text.replace(
                regex,
                `${color}$&${colors.reset}`
            );
        }

        text = text.replace(
            /\b\d+\b/g,
            `${colors.yellow}$&${colors.reset}`
        );

        console.log('\nHighlighted text:');
        console.log(text);

        this.push(text);

        callback();

        process.exit();
    }
}

const keywords = {
    error: 'red',
    success: 'green',
    node: 'blue'
};

const highlightStream = new HighlightStream(keywords);

console.log('Enter text:');

process.stdin.pipe(highlightStream);