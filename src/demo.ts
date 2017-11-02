import {AsciiBarGraph} from './AsciiBarGraph';

const at = new AsciiBarGraph(
    [
        {
            label: 'four',
            value: 4,
        },
        {
            label: 'five',
            value: 5,
        },
    ],
    {
        yLabel: 'y-axis',
    }
);

const output = at.generate();

console.log(`\n\n${output}\n\n`);