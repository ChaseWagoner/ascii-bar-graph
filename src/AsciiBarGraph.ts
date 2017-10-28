class AsciiBarGraphConfig {
  xLabel?: string = '';
  yLabel?: string = '';

  [x: string]: any;
}

export class AsciiBarGraph {
  constructor(
    protected data: Array<InputRow>,
    protected config: AsciiBarGraphConfig
  ) {}

  display() {
    const dataLineCount = this.data.reduce((prev: number, curr: InputRow) => {
      return (curr.value > prev) ? curr.value : prev;
    }, 0);
    const yLabelLine = Math.ceil(dataLineCount / 2);

    let output = '';

    for (let line = dataLineCount; line > 0; line--) {
      if (line === yLabelLine) {
        output += this.config.yLabel;
      }
    }
  }
}