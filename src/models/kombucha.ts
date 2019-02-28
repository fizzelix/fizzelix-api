import mongoose from "mongoose";

const kombuchaSchema = new mongoose.Schema({
  brewers: { type: [String], required: true },
  teaType: { type: String, required: true },
  containerSize: { type: String, required: true },
  containerType: { type: String, required: true },
  mainIngredients: {
    waterInQts: { type: Number, required: true },
    sugarInCups: { type: Number, required: true },
    teaInGrams: { type: Number, required: true }
  },
  brewDate: { type: Date, required: true },
  bottleDate: { type: Date, required: false },
  harvestDate: { type: Date, required: false },
  notes: { type: String, required: false }
});

export const Kombucha = mongoose.model("Kombucha", kombuchaSchema);
