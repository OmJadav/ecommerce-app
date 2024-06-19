import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true, match: [/\b\w+@[\w.-]+\.\w{2,4}\b/gi, 'is invalid'],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "ad@min#"],
            default: "user",
        },
        addresses: {
            type: [Schema.Types.Mixed],
            default: [],
        },
    },
    { timestamps: true }
);
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", UserSchema);

export default User;