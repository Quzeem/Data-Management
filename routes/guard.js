const express = require('express')
const {register_guard,
    get_all_guard_data,
    get_single_guard_data,
    delete_single_guard_data,
    update_single_guard_data  } = require('../controllers/guard');

const router = express.Router()

router.route('/register').post(register_guard)
router.get('/guards', get_all_guard_data)
router.route('/guards/:id')
.get(get_single_guard_data)
.delete(delete_single_guard_data)
.put(update_single_guard_data)




module.exports=router