const mongoose = require('mongoose');
const Contact = require('../models/contact');

exports.contacts_get_all = (req, res, next) => {
    Contact.find()
        .select('name email phone _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                contacts: docs.map(doc => {
                    return {
                        name: doc.name,
                        email: doc.email,
                        phone: doc.phone,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/contacts/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.contacts_create_contact = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    contact
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created Contact Successfully",
                createdContact: {
                    name: result.name,
                    email: result.email,
                    phone: result.phone,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/contacts/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.contacts_get_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
        .select('name email phone _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    contact: doc,
                    request: {
                        type: 'GET',
                        url: 'http:localhost:3000/contacts'
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            };

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.contacts_update_contact = (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Contact.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contact Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/contacts/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.contacts_delete_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contact Deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/contacts',
                    body: {
                        name: 'String', email: 'String', phone: 'String'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};