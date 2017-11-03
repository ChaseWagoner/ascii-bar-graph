import InputRow from './InputRow';
import { BarCharMap, BarCharMappings } from './BarChars';
import { strRepeat, pad } from './utils';

class AsciiBarGraphConfig {
  xLabel?: string = '';
  yLabel?: string = '';

  horizontalMargin?: number = 4;
  barWidth?: number|string = 'auto';

  [x: string]: any;
}

export class AsciiBarGraph {
  constructor(
    protected data: Array<InputRow>,
    protected config?: AsciiBarGraphConfig
  ) {
    this.config = (<any>Object).assign(new AsciiBarGraphConfig(), config);
  }

  generate(): string {
    const dataLineCount = this.data.reduce((prev: number, curr: InputRow) => {
      return (curr.value > prev) ? curr.value : prev;
    }, 0);
    const yLabelLine = Math.ceil((dataLineCount + 1)/ 2);

    const dataLabelWidth = this.data.reduce((prev: number, curr: InputRow) => {
      return (curr.label.length > prev) ? curr.label.length : prev;
    }, 0);

    const horizontalMarginSpaces = strRepeat(this.config.horizontalMargin);

    const marginLeftOfBar = strRepeat(this.config.yLabel.length + 2);

    const barWidth = this.config.barWidth === 'auto'
      ? dataLabelWidth
      : this.config.barWidth as number;

    let output = '';

    for (let line = dataLineCount + 1; line > 0; line--) {
      if (line === yLabelLine) {
        output += ` ${this.config.yLabel} `;
      }
      else {
        output += marginLeftOfBar;
      }

      output += '┃';

      const lineValue = line;

      let chars: BarCharMap = null;

      this.data.forEach((datum: InputRow) => {
        output += horizontalMarginSpaces;

        if (lineValue > datum.value) {
          chars = BarCharMappings.SPACES;
        }
        else if (lineValue === datum.value) {
          chars = BarCharMappings.TOP_LINE;
        }
        else {
          chars = BarCharMappings.MID_LINE;
        }

        output += chars.left + strRepeat(barWidth - 2, chars.inner) + chars.right;
      });

      output += '\n';
    }

    // Print bottom line
    output += `${marginLeftOfBar}┗`;

    this.data.forEach((datum: InputRow) => {
      output += strRepeat(this.config.horizontalMargin, '━')
        + BarCharMappings.BOTTOM_LINE.left
        + strRepeat(barWidth - 2, BarCharMappings.BOTTOM_LINE.inner)
        + BarCharMappings.BOTTOM_LINE.right;
    });

    output += strRepeat(this.config.horizontalMargin, '━') + '\n';

    // Label each bar
    output += `${marginLeftOfBar} ${horizontalMarginSpaces}`;
    const labelsOutput = this.data.map((datum: InputRow) => {
      const label = datum.label.substr(0, barWidth);
      return pad.center(label, barWidth);
    });

    output += labelsOutput.join(horizontalMarginSpaces);

    // Add x-axis label if set
    if (this.config.xLabel.length) {
      output += `\n${marginLeftOfBar}`;

      const tableWidth = 1
        + this.config.horizontalMargin * (this.data.length + 1)
        + this.data.length * barWidth;

      output += pad.center(this.config.xLabel, tableWidth);
    }

    return output;
  }
}
