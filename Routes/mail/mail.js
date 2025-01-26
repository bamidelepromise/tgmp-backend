const express = require("express");
const upload = require("../../Utilities/multer");

const {
  sendMailerToMember,
  sendInvitationToAll,
} = require("../../Controllers/mailer/mail");

const router = express.Router();

router.post("/", sendMailerToMember);
router.post("/send-to-multiple", upload.single("file"), sendInvitationToAll);

module.exports = router;
