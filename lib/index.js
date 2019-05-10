function cpfValidator(cpf) {
  const cpfString = convertInputToString(cpf);
  const cpfArray = cpfString.split('').map(Number);
  const areNumbersEqual = cpfArray.every(value => value === cpfArray[0]);
  if (areNumbersEqual || cpfArray.length !== 11) {
    return false;
  }

  const firstDigit = calcFactor(cpfArray, 9);
  if (firstDigit === cpfArray[9]) {
    const secondDigit = calcFactor(cpfArray, 10);
    return secondDigit === cpfArray[10];
  }
  
  return false;
}

function convertInputToString(cpf) {
  if (typeof cpf === 'string') {
    return cpf.replace(/\D/g, '');
  } else if (typeof cpf === 'number') {
    return cpf.toString();
  }
  throw new Error(`Tipo de entrada inválida: ${typeof cpf}. Ou número de digitos invalido`);
}

function calcFactor(array, digitIndex) {
  const numbersSum = array.slice(0, digitIndex).reduce((acc, currentValue, currentIndex) => (
    acc += currentValue * (digitIndex + 1 - currentIndex)
  ), 0);
  return ((numbersSum * 10) % 11) === 10 ? 0 : numbersSum;
}

module.exports = cpfValidator;
