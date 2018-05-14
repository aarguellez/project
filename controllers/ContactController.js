const mongoose = require("mongoose");
const Contact = require("../models/Contact");

const contactController = {};

contactController.list = function (req, res) {
  Contact.find({}).exec(function (err, contacts) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/contacts/index", { contacts: contacts });
    }
  });
};

contactController.show = function (req, res) {
  Contact.findOne({ _id: req.params.id }).exec(function (err, contact) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/contacts/show", { contact: contact });
    }
  });
};

contactController.create = function (req, res) {
  res.render("../views/contacts/create");
};

contactController.save = function (req, res) {
  var contact = new Contact(req.body);
  console.log(contact);
  contact.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/contacts/create");
    } else {
      console.log("Successfully created a contact.");
      res.redirect("/contacts/show/" + contact._id);
    }
  });
};

contactController.edit = function (req, res) {
  Contact.findOne({ _id: req.params.id }).exec(function (err, contact) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/contacts/edit", { contact: contact });
    }
  });
};

contactController.update = function (req, res) {
  Contact.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      }
    },
    { new: true },
    function (err, contact) {
      if (err) {
        console.log(err);
        res.render("../views/contacts/edit", { contact: req.body });
      }
      res.redirect("/contacts/show/" + contact._id);
    }
  );
};

contactController.delete = function (req, res) {
  Contact.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Contact deleted!");
      res.redirect("/contacts");
    }
  });
};

module.exports = contactController;