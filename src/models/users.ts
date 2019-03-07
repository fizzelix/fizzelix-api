import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 4 },
  username: { type: String, required: false },
  yearsOfExperience: { type: Number, required: false },
  kombuchas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Kombucha"
    }
  ]
});

export const User = mongoose.model("User", usersSchema);
