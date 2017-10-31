export class BarCharMap {
    constructor(
        public left: string,
        public inner: string,
        public right: string
    ) {}
}

const BarCharMappings = Object.freeze({
    SPACES: new BarCharMap(' ', ' ', ' '),
    TOP_LINE: new BarCharMap('┌', '─', '┐'),
    MID_LINE: new BarCharMap('│', ' ', '│'),
    BOTTOM_LINE: new BarCharMap('┷', '━', '┷'),
});

export {BarCharMappings};