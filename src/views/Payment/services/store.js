const units = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const tens = [
  "",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function NumberToEnglishWords(number) {
  if (number === 0) return "Zero dollars";

  const convertHundreds = (num) => {
    let str = "";
    const hundred = Math.floor(num / 100);
    num = num % 100;

    if (hundred > 0) {
      str += `${units[hundred]} hundred `;
    }

    if (num > 0) {
      const ten = Math.floor(num / 10);
      const unit = num % 10;

      if (ten > 0) {
        str += `${tens[ten]} `;
      }

      if (unit > 0) {
        str += units[unit];
      }
    }

    return str.trim();
  };

  let result = "";

  if (number >= 1e9) {
    result += `${NumberToEnglishWords(Math.floor(number / 1e9))} billion `;
    number = number % 1e9;
  }

  if (number >= 1e6) {
    result += `${NumberToEnglishWords(Math.floor(number / 1e6))} million `;
    number = number % 1e6;
  }

  if (number >= 1e3) {
    result += `${NumberToEnglishWords(Math.floor(number / 1e3))} thousand `;
    number = number % 1e3;
  }

  result += convertHundreds(number);

  result = result
    .replace(/ dollars$/, "")
    .replace(/ dollars /g, " ")
    .trim();
  result += " dollars";

  result = result.charAt(0).toUpperCase() + result.slice(1);
  result = result.replace(/  +/g, " ");

  return result;
}

export default NumberToEnglishWords;
