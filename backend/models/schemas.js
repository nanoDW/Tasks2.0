const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    author: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 160
    },
    priority: {
      type: Number,
      default: 1,
      required: true
    },
    deadline: {
      type: Date
    },
    accepted: {
      type: Boolean,
      default: false
    },
    done: {
      type: Boolean,
      default: false
    },
    notes: {
      type: String,
      default: null,
      minlength: 1,
      maxlength: 480
    }
  },
  {
    collection: "tasks"
  }
);

const userSchema = new Schema ({
    nick: {
        type: String,
        required: true, 
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 200,
        required: true
    },
    email: {
        type: String,
        minlength: 8,
        maxlength: 40,
        required: true
    },
    accountCreated: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
        default: false
    }
}, {
        collection: "users"
    })

const messageSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    adressedTo: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        minlength: 1,
        maxlength: 48,
        required: true
    },
    text: {
        type: String,
        minlength: 1,
        maxlength: 480,
        required: true
    },
    sent: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
        collection: "messages"
    })

module.exports = {
    Todo: mongoose.model('Todo', todoSchema),
    User: mongoose.model('User', userSchema),
    Message: mongoose.model('Message', messageSchema)
}