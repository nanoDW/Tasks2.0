const { model, Schema } = require("mongoose");

const taskSchema = new Schema(
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
    rejectionContent: {
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

const friendshipSchema = new Schema({
  user: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  userID: {
    type: String,
    required: true
  },
  accepted: {
    type: Boolean,
    required: true,
    default: false
  }
});

const userSchema = new Schema(
  {
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
    last: {
      type: Number,
      default: 0
    },
    accountCreated: {
      type: Date,
      default: Date.now
    },
    role: {
      type: String,
      default: "user"
    },
    hidden: {
      type: Boolean,
      default: false
    },
    friends: [friendshipSchema]
  },
  {
    collection: "users"
  }
);

const messageSchema = new Schema(
  {
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
  },
  {
    collection: "messages"
  }
);

module.exports = {
  Task: model("Todo", taskSchema),
  User: model("User", userSchema),
  Message: model("Message", messageSchema)
};
