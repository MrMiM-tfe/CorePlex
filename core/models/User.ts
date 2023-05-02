import mongoose, { Model } from "mongoose";
import { IUser } from "../types/user"
import bcrypt from "bcrypt"

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
  },
});

interface IUserMethods {
  isPasswordMatch(password:string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    addresses: [AddressSchema],
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * check is password matches the user's password
 * @param {string} password
 * @return {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

// Encrypt Password Using bcrypt
UserSchema.pre("save", async function (next) {
  
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)

  next()
})


const User = mongoose.model<IUser, UserModel>("User", UserSchema)

export default User