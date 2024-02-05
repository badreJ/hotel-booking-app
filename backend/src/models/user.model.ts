import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  email: { type: "string", required: true, unique: true },
  password: { type: "string", required: true },
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
