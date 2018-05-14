const express = require("express");
const router = express.Router();

const contact = require("../controllers/ContactController");

// Get all employees
router.get("/", contact.list);

// Get single employee by id
router.get("/show/:id", contact.show);

// Create employee
router.get("/create" , contact.create);

// Save employee
router.post("/save", contact.save);

// Edit employee
router.get("/edit/:id", contact.edit);

// Edit update
router.post("/update/:id", contact.update);

// Edit update
router.delete("/delete/:id", contact.delete);

module.exports = router;