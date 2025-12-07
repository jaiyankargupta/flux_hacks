const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false,
    },
    role: {
        type: String,
        enum: ['patient', 'provider', 'admin'],
        default: 'patient',
    },
    //Basic info of patient
    basicInfo: {
        age: Number,
        contactNumber: Number,
        gender: String,
        height: Number,
        weight: Number,
        bloodGroup: String
    },

    // Patient-specific fields
    healthInfo: {
        conditions: [String],
        allergies: [String],
        medications: [String],
        medicalHistory: String,
        emergencyContact: {
            name: String,
            phone: String,
            relationship: String,
        },
    },
    // Patient's assigned provider
    assignedProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // Provider-specific fields
    providerInfo: {
        licenseNumber: {
            type: String,
            trim: true,
        },
        specialization: {
            type: String,
            trim: true,
        },
        qualification: {
            type: String,
            trim: true,
        },
        yearsOfExperience: {
            type: Number,
            min: 0,
        },
        clinicName: {
            type: String,
            trim: true,
        },
        hospitalAffiliation: {
            type: String,
            trim: true,
        },
        // Location information
        location: {
            address: {
                street: String,
                city: String,
                state: String,
                zipCode: String,
                country: {
                    type: String,
                    default: 'India',
                },
            }
        },
        // Contact information
        contactInfo: {
            phone: String,
            alternatePhone: String,
            officeEmail: String,
            website: String,
        },
        // Availability
        availability: {
            workingDays: [String], // e.g., ['Monday', 'Tuesday', 'Wednesday']
            workingHours: {
                start: String, // e.g., '09:00'
                end: String,   // e.g., '17:00'
            },
            consultationFee: Number,
        },
        // Professional details
        languages: [String],
        servicesOffered: [String],
        bio: {
            type: String,
            maxlength: 1000,
        },
    },
    assignedPatients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    consentGiven: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
