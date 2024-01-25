const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be up to 6 characters"],
      // maxLength: [30, "Password must not be more than 30 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please enter a photo"],
      default: "https://i.bb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "876",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must no be more than 250 characters"],
      default: "Bio",
    },
  },
  {
    timestamps: true,
  }
);

// encrypt password before saving to DB

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
