import validator from "validator";
import { isCompletelyEmpty } from "./utils/utils";

const { isEmail, isLength } = validator;

export class Validation {
  public readonly GENERAL: string;
  public readonly EMAIL: string;
  public readonly PASSWORD: string;

  public errors: {
    general?: string;
    email?: string;
    password?: string;
  };

  public isValid: boolean;

  constructor() {
    // ERROR TYPES
    this.GENERAL = "general";
    this.EMAIL = "email";
    this.PASSWORD = "password";

    this.errors = {};
    this.isValid = false;
  }

  public setErrors(message: string, errorType: string): void {
    switch (errorType) {
      case this.EMAIL:
        this.errors.email = message;
        break;
      case this.PASSWORD:
        this.errors.password = message;
        break;
      case this.GENERAL:
        this.errors.general = message;
        break;
      default:
        this.errors.general = message;
        break;
    }
    this.isValid = isCompletelyEmpty(this.errors);
  }

  public validateRegistration(email: string, password: string): void {
    if (!isEmail(email)) {
      this.errors.email = "Please enter a valid Email";
    }
    if (!isLength(password, { min: 4, max: 30 })) {
      this.errors.password = "Password must be at least 4 characters";
    }
    this.isValid = isCompletelyEmpty(this.errors);
  }

  public validateLogin(email: string, password: string): void {
    if (!isEmail(email)) {
      this.errors.email = "Please enter a valid Email";
    }
    if (isCompletelyEmpty(password)) {
      this.errors.password = "Please enter Password";
    }

    this.isValid = isCompletelyEmpty(this.errors);
  }
}
