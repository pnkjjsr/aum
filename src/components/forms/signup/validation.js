import { isEmail, isEmpty, isMobile } from "@/utils/validation/type";

function validation(data) {
  let errors = {};

  let mobile = data.mobile.value;

  if (isEmpty(mobile)) {
    errors["mobile"] = "Mobile must not be empty";
  } else if (!isMobile(mobile)) {
    errors["mobile"] = "Must be a valid mobile number";
  }

  // if (isEmpty(data.email)) {
  //   errors["email"] = "Email must not be empty";
  // } else if (!isEmail(data.email)) {
  //   errors["email"] = "Must be a valid email address";
  // }

  // if (isEmpty(data.pincode)) errors.pincode = 'Pincode must not be empty';
  // if (isEmpty(data.area)) errors.area = 'Area must not be empty';
  // if (isEmpty(data.password)) errors.password = 'Password must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}

export default validation;
