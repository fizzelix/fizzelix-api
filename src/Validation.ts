import validator from "validator";
const { isEmpty, isEmail, isLength } = validator;

class Validation {
  public isEmpty(value: any): boolean {
    if (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    ) {
      return true;
    }
    return false;
  }

  public validateRegistration(email: string, password: string) {
    const errors: {
      general?: string;
      email?: string;
      password?: string;
    } = {};

    if (isEmpty(email)) {
      errors.email = "Please enter Email";
    }
    if (!isEmail(email)) {
      errors.email = "Please enter a valid Email";
    }

    if (isEmpty(password)) {
      errors.password = "Please enter Password";
    }
    if (isLength(password, { min: 4, max: undefined })) {
      errors.password = "Password must be at least 4 characters";
    }
    return { errors, isValid: this.isEmpty(errors) };
  }
}

export default new Validation();
