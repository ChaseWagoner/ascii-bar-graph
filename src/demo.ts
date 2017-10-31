import {AsciiBarGraph} from './AsciiBarGraph';

const at = new AsciiBarGraph(
    [
        {
            some: 'thing',
            label: 'one',
            value: 4,
        }
    ]
);

const output = at.generate();

console.log(`\n\n${output}\n\n`);