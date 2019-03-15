import mongoose from "mongoose";

const KombuchaSecondarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bottleDate: { type: Date, required: true },
  fermentationDuration: { type: Number, required: true },
  notes: { type: String, required: false },
});

export const KombuchaSecondary = mongoose.model("KombuchaSecondary", KombuchaSecondarySchema);
