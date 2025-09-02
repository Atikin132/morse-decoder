const MORSE_TABLE = {
  '.-': 'a',
  '-...': 'b',
  '-.-.': 'c',
  '-..': 'd',
  '.': 'e',
  '..-.': 'f',
  '--.': 'g',
  '....': 'h',
  '..': 'i',
  '.---': 'j',
  '-.-': 'k',
  '.-..': 'l',
  '--': 'm',
  '-.': 'n',
  '---': 'o',
  '.--.': 'p',
  '--.-': 'q',
  '.-.': 'r',
  '...': 's',
  '-': 't',
  '..-': 'u',
  '...-': 'v',
  '.--': 'w',
  '-..-': 'x',
  '-.--': 'y',
  '--..': 'z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0',
};

module.exports = function decode(expr) {
  const words = expr.split('**********');
  const splitArrs = [];
  const morseArrs = [];
  for (let i = 0; i < words.length; i += 1) {
    splitArrs.push(
      words[i]
        .split(/(\d{2})/)
        .filter((x) => x !== '')
        .map((x) => {
          if (x === '00') {
            return '';
          }
          if (x === '10') {
            return '.';
          }
          if (x === '11') {
            return '-';
          }
          return x;
        })
    );
    let str = '';
    for (let j = 0; j < splitArrs[i].length; j += 1) {
      if (splitArrs[i][j] !== '') {
        str = `${str}${splitArrs[i][j]}`;
      } else if (j !== 0 && splitArrs[i][j] === '') {
        morseArrs.push(str);
        str = '';
      }
      if (j === splitArrs[i].length - 1) {
        morseArrs.push(str);
        str = '';
      }
    }
    morseArrs.push(' ');
  }
  let res = '';
  morseArrs
    .filter((x) => x !== '')
    .map((x) => {
      if (x === ' ') {
        res = `${res}${x}`;
        return x;
      }
      if (x.length > 5) {
        const arr = [];
        if (x.length % 5 !== 0) {
          arr.push(x.slice(0, x.length % 5));
        }
        arr
          .concat(x.slice(x.length % 5, x.length).match(/.{1,5}/g))
          .map((y) => {
            res = `${res}${MORSE_TABLE[y]}`;
            return y;
          });
        return x;
      }
      res = `${res}${MORSE_TABLE[x]}`;
      return x;
    })
    .join('');
  return res.trim();
};
