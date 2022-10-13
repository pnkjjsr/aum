exports.isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.isEmpty = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

exports.isBoolean = (boolean) => {
  if (boolean === '') return true;
  else return false;
};


exports.isMobile = (mobile) => {
  if (!Number(mobile)) return false;
  else if (mobile.length < 10) return false;
  else return true;
};