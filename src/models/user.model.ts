import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";


export enum UserRole {
    EMPLOYEE = 'employee',
    MANAGER = "manager",
    ADMIN = "admin"
}

export interface IUser extends Document {

    userName: string;
    email: string;
    password?: string;
    role: UserRole;

    matchPassword(enteredPassword: string): Promise<boolean>;

}

const userSchema = new Schema<IUser>({

    userName: {
        type: String,
        required: [true, "First name is required"],
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false, // Don't return password in queries by default
    },

    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.ADMIN,
    },




}, { timestamps: true }
)


// Encrypt password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password") || !this.password) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw error;
    }
});


// Compare entered password with stored hash
userSchema.methods.matchPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);