const express = require('express')
const router = express.Router()

router.
route('/login')
.get(async (req,res) => {
    res.send('welcome to login Page')

})
.post(async (req,res) => {

})

module.exports = router