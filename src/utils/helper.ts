export const validatePhone = (inputtxt) => {
  return String(inputtxt)
    .toLowerCase()
    .match(/^[0-9]{10}$|^[0-9]{12}$/);
};
