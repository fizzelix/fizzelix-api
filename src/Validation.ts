import validator from "validator";
const { isEmpty, isEmail, isLength } = validator;

const isCompletelyEmpty = (value: any) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  }
  return false;
};

class Validation {
  public validateRegistration(email: string, password: string) {
    const errors: {
      general?: string;
      email?: string;
      password?: string;
    } = {};

    if (!isEmail(email)) {
      errors.email = "Please enter a valid Email";
    }

    if (!isLength(password, { min: 4, max: 30 })) {
      errors.password = "Password must be at least 4 characters";
    }
    return { errors, isValid: isCompletelyEmpty(errors) };
  }

  public validateLogin(email: string, password: string) {
    const errors: {
      general?: string;
      email?: string;
      password?: string;
    } = {};

    if (!isEmail(email)) {
      errors.email = "Please enter a valid Email";
    }

    if (isEmpty(password)) {
      errors.password = "Please enter Password";
    }
    return { errors, isValid: isCompletelyEmpty(errors) };
  }
}

export default new Validation();
