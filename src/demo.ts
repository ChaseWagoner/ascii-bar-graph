import { AsciiBarGraph } from './AsciiBarGraph';

const at = new AsciiBarGraph(
  [
    {
      label: 'too many for the bar',
      value: 10,
    },
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
    xLabel: 'my x-axis',
  }
);

const output = at.generate();

console.log(`\n\n${output}\n\n`);
