import mongoose from "mongoose";
import { KombuchaPrimary } from "../models/kombuchaPrimary";
import { KombuchaSecondary } from "../models/kombuchaSecondary";

export const isCompletelyEmpty = (value: any): boolean => {
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

export const getKombuchaType = (
  urlParameter: string
): { type: string; model: mongoose.Model<mongoose.Document, {}> } => {
  let kombuchaModel: mongoose.Model<mongoose.Document, {}>;
  let kombuchaType: string;

  if (urlParameter === "primary") {
    kombuchaModel = KombuchaPrimary;
    kombuchaType = "primary";
  } else if (urlParameter === "secondary") {
    kombuchaModel = KombuchaSecondary;
    kombuchaType = "secondary";
  } else {
    kombuchaModel = KombuchaPrimary;
    kombuchaType = "primary";
  }

  return {
    type: kombuchaType,
    model: kombuchaModel,
  };
};
