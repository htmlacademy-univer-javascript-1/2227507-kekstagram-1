function getRandomNumber(startNumber, finalNumber) {
  if (startNumber < 0 || finalNumber < 0) {
    return 'Некорректный диапазон';
  }

  if (Math.ceil(startNumber) === Math.floor(finalNumber)) {
    return Math.ceil(startNumber);
  }

  if (startNumber > finalNumber) {
    const twist = startNumber;
    startNumber = finalNumber;
    finalNumber = twist;
  }
  const startNum = Math.ceil(startNumber);
  return Math.floor(Math.random() * (Math.floor(finalNumber) - startNum + 1)) + startNum;

}
getRandomNumber(0.3, 7);

function maxLength(string, maxLen) {
  return string.length <= maxLen;
}
maxLength('', 4);

