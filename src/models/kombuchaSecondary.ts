import mongoose from "mongoose";

const KombuchaSecondarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bottleDate: { type: Date, required: true },
  fermentationDuration: { type: Number, required: true },
  flavors: { type: String, required: false },
  notes: { type: String, required: false },
  archived: { type: Boolean, required: true },
});

export const KombuchaSecondary = mongoose.model("KombuchaSecondary", KombuchaSecondarySchema);
