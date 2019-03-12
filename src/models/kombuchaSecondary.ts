import mongoose from "mongoose";

const KombuchaSecondarySchema = new mongoose.Schema({
  bottleDate: { type: Date, required: true },
  fermentationDuration: { type: Number, required: true },
  notes: { type: String, required: false },
});

export const KombuchaSecondary = mongoose.model("KombuchaSecondary", KombuchaSecondarySchema);
