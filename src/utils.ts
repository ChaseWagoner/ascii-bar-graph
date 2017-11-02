export const strRepeat = (count: number = 0, str: string = ' ') => {
  return str.repeat(count);
};

export const pad = {
  generic: (str: string, left: number = 0, right: number = 0) => {
    left = Math.max(0, left);
    right = Math.max(0, right);

    return `${strRepeat(left)}${str}${strRepeat(right)}`;
  },

  left: (str: string, width: number = 0) => {
    return pad.generic(str, width - str.length, 0);
  },

  center: (str: string, width: number = 0) => {
    const leftPad = Math.floor((width - str.length) / 2);
    const rightPad = width - str.length - leftPad;

    return pad.generic(str, leftPad, rightPad);
  },

  right: (str: string, width: number = 0) => {
    return pad.generic(str, 0, width - str.length);
  },
};
