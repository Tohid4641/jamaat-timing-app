const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        minLength: 4,
        maxLength: 10,
        validate: (v) => {
            if (!validator.isAlpha(v)) {
                throw new Error("First name should contain only letters'")
            }
        }
    },
    email: {
        type: String,
        required: [true, 'Email Id is required'],
        unique: [true, 'email already exists'],
        validate: {
            validator: (v) => validator.isEmail(v), // Checks for valid email format
            message: 'Please provide a valid email address'
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: (v) => validator.isStrongPassword(v, {
                minLength: 6,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            }),
            message: 'Password must be strong (include uppercase, lowercase, number, and symbol)'
        }
    },
    role: { type: String, enum: ["user", "admin", "superAdmin"], default: "user" },
    masjids : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Masjid' }]
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", UserSchema);