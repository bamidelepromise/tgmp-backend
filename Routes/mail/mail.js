const express = require("express");
const upload = require("../../Utilities/multer");

const {
  sendMailerToMember,
  sendInvitationToAll,
  sendScheduledEmails,
} = require("../../Controllers/mailer/mail");

const router = express.Router();

router.post("/", sendMailerToMember);
router.post("/send-to-multiple", upload.single("file"), sendInvitationToAll);
router.get("/auto-send", sendInvitationToAll);
router.get("/send-instant", sendScheduledEmails);

module.exports = router;
