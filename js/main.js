const getInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const checkTextLength = (text, maxLength) => text.length <= maxLength;

getInteger(0, 10);
checkTextLength('Test', 10);
