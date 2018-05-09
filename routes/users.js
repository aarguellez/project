const express = require('express')
const router = express.Router()

const user = require('../controllers/user')
/* GET users listing. */
router.get('/', user.list)

// Save user
router.post("/user", user.create)

// Edit or create a user
router.get("/user/:id?", user.edit)

router.put('/user/:id?',user.update)

router.delete('/user/:id', user.delete)

module.exports = router