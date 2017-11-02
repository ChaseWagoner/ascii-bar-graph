import InputRow from './InputRow';
import {BarCharMap, BarCharMappings} from './BarChars';

class AsciiBarGraphConfig {
  xLabel?: string = '';
  horizontalMargin?: number = 4;

  yLabel?: string = '';

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
    const yLabelLine = Math.ceil(dataLineCount / 2);

    const dataLabelWidth = this.data.reduce((prev: number, curr: InputRow) => {
      return (curr.label.length > prev) ? curr.label.length : prev;
    }, 0);

    const horizontalMarginSpaces = Array(this.config.horizontalMargin + 1).join(' ');

    const marginLeftOfBar = Array(this.config.yLabel.length + 3).join(' ');

    const barWidth = 6;

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

        output += chars.left + Array(barWidth - 1).join(chars.inner) + chars.right;
      });

      output += '\n';
    }

    // Print bottom line
    output += `${marginLeftOfBar}┗`;

    this.data.forEach((datum: InputRow) => {
      output += Array(this.config.horizontalMargin + 1).join('━')
        + BarCharMappings.BOTTOM_LINE.left
        + Array(barWidth - 1).join(BarCharMappings.BOTTOM_LINE.inner)
        + BarCharMappings.BOTTOM_LINE.right;
    });

    output += Array(this.config.horizontalMargin + 1).join('━') + '\n';

    // Label each bar
    output += `${marginLeftOfBar} `;
    this.data.forEach((datum: InputRow) => {
      output += horizontalMarginSpaces;

      let label = datum.label;

      if (label.length < barWidth) {
        const leftPad = Math.floor((barWidth - label.length) / 2);
        const rightPad = barWidth - label.length - leftPad;
        label = `${Array(leftPad + 1).join(' ')}${label}${Array(rightPad + 1).join(' ')}`;
      }

      output += label;
    });

    return output;
  }
}