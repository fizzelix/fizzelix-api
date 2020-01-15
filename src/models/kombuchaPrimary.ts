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
  brewDuration: { type: Number, required: true },
  notes: { type: String, required: false },
  archived: { type: Boolean, required: true },
  convertedToSecondary: { type: Boolean, required: true },
});

export const KombuchaPrimary = mongoose.model("KombuchaPrimary", kombuchaPrimarySchema);
