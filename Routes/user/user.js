const express  = require('express');
const upload = require("../../Utilities/multer");
const { registerUser, registerUsersFromExcel, getAllUsers } = require('../../Controllers/user/user');

const router = express.Router();

router.post('/register', registerUser);
router.get('/', getAllUsers);
router.post('/register-from-excel', upload.single("file"), registerUsersFromExcel);


module.exports = router;