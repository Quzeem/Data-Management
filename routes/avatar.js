const express = require('express')
const { multerUpload } = require('../config/multerUpload')
const {
    guardAvatar, guarantorOneAvatar, guarantorTwoAvatar
} = require('../controllers/avatarUpload')

const { auth } = require('../middleware/auth')


const router = express.Router()

router.post('/:id/avatar', auth, multerUpload.single('guardAvatar'), guardAvatar)

router.post('/:id/avatarone', auth, multerUpload.single('guarantorOneAvatar'), guarantorOneAvatar)

router.post('/:id/avatartwo', auth, multerUpload.single('guarantorTwoAvatar'), guarantorTwoAvatar)





module.exports = router