const isEmpty = (string) => {
  if (string === undefined || string === null) return false;
  return String(string.trim()) !== "";
};

const isNormalLetterAndNumber = (string) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(string);
};

const isNormalName = (string) => {
  const regex = /^[a-zA-Z0-9\s]+$/;
  return regex.test(string);
};

const isNumbers = (string) => {
  const regex = /^[0-9]+$/;
  return regex.test(string);
};

const isEmailAddress = (string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(string);
};

export default {
  isEmpty,
  isNormalLetterAndNumber,
  isEmailAddress,
  isNormalName,
  isNumbers,
};
