const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const TEACHERS_EMAILS = process.env.TEACHERS_EMAILS?.split(',').map(email => email.trim()) || [];
const TAS_EMAILS = process.env.TAS_EMAILS?.split(',').map(email => email.trim()) || [];

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: "Student name is required",
      minlength: [3, "Student name needs at least 3 chars"],
    },
    email: {
      type: String,
      required: "Student email is required",
      match: [/^\S+@\S+\.\S+$/, "Student email must be valid"],
    },
    confirm: {
      type: Boolean,
      default: process.env.USER_CONFIRMATION_REQUIRED === "false",
    },
    username: {
      type: String,
      required: "Username is required",
      minlength: [3, "Username needs at least 3 chars"],
      match: [/^[a-z0-9]+$/, "Username must be lowercase and without spaces"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: "Student password is required",
      minlength: [8, "Student password needs at least 8 chars"],
    },
    bio: {
      type: String,
      required: "Student bio is required",
    },
    skills: [String],
    githubUrl: {
      type: String,
      required: "Student githubUrl is required",
      match: [
        /^https?:\/\/github\.com\/[a-z0-9]+$/,
        "Github URL must be valid",
      ],
    },
    linkedinUrl: {
      type: String,
      required: "Student linkedinUrl is required",
      match: [
        /^https?:\/\/linkedin\.com\/in\/[a-z0-9]+$/,
        "Linkedin URL must be valid",
      ],
    },
    address: String,
    location: {
      type: new Schema({
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }),
      validate: {
        validator: function (location) {
          console.log(this);
          return this.address != undefined && location.coordinates?.length > 0;
        },
        message: 'Location is required'
      }
    },
    imageUrl: {
      type: String,
      required: "Student image url is required",
      match: [/^https?:\/\/.+\.(jpg|jpeg|png)$/, "Image URL must be valid"],
      default: function () {
        const match = this.githubUrl.match(/^https?:\/\/(www\.)?github.com\/(?<user>[\w.-]+)/);
        return `https://github.com/${match.groups.user}.png`
      }
    },
    cohort: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cohort",
      required: "Student cohort is required",
    },
    role: {
      type: String,
      enum: ["teacher", "ta", "student"],
      default: "student"
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        ret.location = {
          address: ret.address || '',
          coordinates: ret.location?.coordinates || []
        }
        delete ret.address;
        return ret;
      },
    },
  }
);

studentSchema.pre("save", function (next) {
  const student = this;

  if (TEACHERS_EMAILS.includes(student.email)) {
    student.role = 'teacher';
  } else if (TAS_EMAILS.includes(student.email)) {
    student.role = 'ta';
  } else {
    student.role = 'student';
  }

  if (student.isModified("password")) {
    bcrypt
      .genSalt(10)
      .then((salt) => {
        return bcrypt.hash(student.password, salt).then((hash) => {
          student.password = hash;
          next();
        });
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

studentSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

studentSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "authors", // TODO
  justOne: false,
});

studentSchema.index({ location: '2dsphere' });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
