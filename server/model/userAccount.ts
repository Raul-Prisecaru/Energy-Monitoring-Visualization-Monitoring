import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserSchema extends mongoose.Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    devices: mongoose.Types.ObjectId[];
    settings?: {
        monthlyCostGoal: number;
        yearlyCostGoal: number;
        monthlyEnergyUsageGoal: number;
        yearlyEnergyUsageGoal: number;
        pricePerkWh: number;
    } | null;

    validatePassword(password: string): Promise<boolean>;
    changePassword(password: string): Promise<void>;
}

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    devices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Device'
        }
    ],

    settings: {
        monthlyCostGoal: {
            type: Number,
            default: 200
        },

        yearlyCostGoal: {
            type: Number,
            default: 2400
        },

        monthlyEnergyUsageGoal: {
            type: Number,
            default: 225
        },

        yearlyEnergyUsageGoal: {
            type: Number,
            default: 2700
        },

        pricePerkWh: {
            type: Number,
            default: 0.22
        }
    }
});

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.changePassword = async function (password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
    await this.save();
};

const User = mongoose.model<UserSchema>("User", userSchema);
export default User;