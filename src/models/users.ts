import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  kombuchas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kombucha"
    }
  ]
});

export const User = mongoose.model("User", usersSchema);
