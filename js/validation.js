
function checkInput(value) {
  let error = false;
  let message = '';

  let valueLen = 255; // max long value

  if (isEmty(value)) {
    error = true;
    message = "all fields must be filled";
    return { error, message };
  }

  if (checkNumbers(value)) {
    if (+value < 0) {
      error = true;
      message = 'the number must be positive'

      return { error, message };
    }
    if (value.length > valueLen) {
      error = true;
      message = 'number must be less than 255 characters'
      return { error, message };
    }
  } else {
    error = true;
    message = 'you entered an invalid value'
  }

  return { error, message };

  function checkNumbers(value) {
    let number = value.trim();
    if (number && isFinite(number)) {
      return true;
    }
    return false;
  }

  function isEmty(value) {
    return value.trim() === '' ? true : false;
  }
}

export { checkInput };





