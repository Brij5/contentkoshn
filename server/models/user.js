const mongoose = require('mongoose');

// Check if the model already exists
if (!mongoose.models.User) {
  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  }, { timestamps: true });

  mongoose.model('User', UserSchema);
}

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);