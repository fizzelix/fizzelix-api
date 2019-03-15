import mongoose from "mongoose";

const kombuchaPrimarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  teaType: { type: String, required: true },
  containerSize: { type: String, required: true },
  containerType: { type: String, required: true },
  mainIngredients: {
    water: { type: Number, required: true },
    sugar: { type: Number, required: true },
    tea: { type: Number, required: true },
  },
  brewDate: { type: Date, required: true },
  bottleDate: { type: Date, required: false },
  harvestDate: { type: Date, required: false },
  notes: { type: String, required: false },
});

export const KombuchaPrimary = mongoose.model("KombuchaPrimary", kombuchaPrimarySchema);
