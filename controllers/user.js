const mongoose = require("mongoose")
const User = require("../models/user")

const userController = {}

userController.list = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      console.log("Error:", err)
    } else {
      res.render("users/index", { users })
    }
  });
};

userController.edit = (req, res) => {
  const userId = req.params.id

  if (userId) {
    User.findOne({ _id: userId }).exec((err, user) => {
      if (err) {
        console.log("Error:", err)
      } else {
        res.render("users/edit", { user })
      }
    })
  } else {
    res.render("users/create")
  }
};

userController.create = (req, res) => {
  var user = new User(req.body)

  user.save((err, newUser) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json(err);
    } else {
      console.log("Successfully created a user.")
      res.json(newUser)
    }
  });
};

userController.update = (req, res) => {
  const updatedUser = req.body
  User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: updatedUser.name,
        address: updatedUser.address,
        position: updatedUser.position,
        salary: updatedUser.salary
      }
    },
    { new: true }, // return updated
    (err, user) => {
      console.log("in update callback");
      if (err) {
        console.log("failed to update", err)
      }
      res.json(user)
    }
  );
};

userController.delete = (req, res) => {
  const uid = req.params.id;
  User.remove({ _id: uid }, err => {
    if (err) {
      console.log(err)
    } else {
      console.log(`User ${uid} deleted!`)
    }
  })

  // the server should respond with data to fire jquery callback
  res.json({})
}

module.exports = userController