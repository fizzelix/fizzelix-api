import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true, minlength: 4 },
  username: { type: String, required: false },
  kombuchas: {
    primary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KombuchaPrimary",
      },
    ],
    secondary: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KombuchaSecondary",
      },
    ],
  },
});

export const User = mongoose.model("User", usersSchema);
