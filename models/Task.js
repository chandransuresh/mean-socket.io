const mongoose = require('mongoose');

mongoose.model('task',
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      default: Date.now
    }
  })
);