const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ContactsController = require('../controllers/contacts');

const Contact = require('../models/contact');

// Handle incoming GET requests to /contacts
router.get('/', ContactsController.contacts_get_all);

// Handle incoming POST requests to /contacts
router.post('/', ContactsController.contacts_create_contact);

// Handle incoming GET requests to /contacts/_id
router.get('/:contactId', ContactsController.contacts_get_contact);

// Handle incoming PATCH requests to /contacts/_id
router.patch('/:contactId', ContactsController.contacts_update_contact);

// Handle incoming DELETE requests to /contacts/_id
router.delete('/:contactId', ContactsController.contacts_delete_contact);

module.exports = router;
