import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  yearsOfExperience: { type: Number, required: false },
  kombuchas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kombucha"
    }
  ]
});

export const User = mongoose.model("User", usersSchema);
