const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const helper = require("../../Utilities/helpers");
const XLSX = require("xlsx");
const { scheduleTime } = require("../../Utilities/emailTemplate");
const User = require("../../Models/userModel");


require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMailerToMember = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    subject = "Sunday Service Invitation",
    address = "B4, Plot 456, Obafemi Awolowo/Mike Akigbe Way, by Apostolic Faith Bus Stop, Jabi, Abuja",
  } = req.body;

  // Church service schedule
  const schedule = scheduleTime;

  // Email body
  const mailBody = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
      <h2 style="text-align: center; color: #007bff;">Sunday Service Invitation</h2>

      <p>Dear <strong>${name}</strong>,</p>

      <p>We warmly invite you to join us for our Sunday service this week. Here’s the schedule:</p>
      ${schedule}

      <p style="line-height: 1.6;">We are looking forward to worshiping with you and growing together in faith. Your presence would be a blessing to us!</p>

      <div style="border-top: 2px solid #007bff; padding-top: 20px; margin-top: 20px;">
        <p><strong>Location:</strong> @ ${address}</p>
        <p><strong>Date:</strong> This Sunday</p>
        <p><strong>Contact:</strong> apostolicfaithjabi@gmail.com | 08130567664</p>
      </div>

      <p style="line-height: 1.6;">We pray for God's blessings and look forward to seeing you soon.</p>

      <p>In Christ,</p>

      <p style="font-weight: bold; color: #007bff;">The Apostolic Faith Church &copy; IT Team</p>
    </div>
  </div>
`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject || "Sunday Service Invitation",
    html: mailBody,
  };

  

  try {
    await transporter.sendMail(mailOptions);
    return helper.controllerResult({
      req,
      res,
      message: "Church service invitation email sent successfully.",
    });
  } catch (error) {
    return helper.controllerResult({
      req,
      res,
      statusCode: 500,
      result: error,
      message: error.message,
    });
  }
});

const sendInvitationToAll = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return helper.controllerResult({
        req,
        res,
        statusCode: 400,
        message: "No file uploaded. Please upload an Excel file.",
      });
    }

    // Read and parse the Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!Array.isArray(sheetData) || sheetData.length === 0) {
      return helper.controllerResult({
        req,
        res,
        statusCode: 400,
        message: "Excel file is empty or invalid.",
      });
    }

    const errors = [];

    // Email body details
    const subject = "Sunday Service Invitation";
    const address =
      "B4, Plot 456, Obafemi Awolowo/Mike Akigbe Way, by Apostolic Faith Bus Stop, Jabi, Abuja";
    const schedule = scheduleTime;

    // Iterate through the rows and send emails
    for (const row of sheetData) {
      const { FULLNAME, EMAIL, ADDRESS } = row;

      if (!EMAIL || !FULLNAME) {
        errors.push({
          row,
          message: "Missing required fields (fullname or email).",
        });
        continue;
      }

      const mailBody = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
          <h2 style="text-align: center; color: #007bff;">Sunday Service Invitation</h2>
    
          <p>Dear <strong>${FULLNAME}</strong>,</p>
    
          <p>We warmly invite you to join us for our Sunday service this week. Here’s the schedule:</p>
          ${schedule}
    
          <p style="line-height: 1.6;">We are looking forward to worshiping with you and growing together in faith. Your presence would be a blessing to us!</p>
    
          <div style="border-top: 2px solid #007bff; padding-top: 20px; margin-top: 20px;">
            <p><strong>Location:</strong> @ ${ADDRESS ? ADDRESS : address}</p>
            <p><strong>Date:</strong> This Sunday</p>
            <p><strong>Contact:</strong> apostolicfaithjabi@gmail.com | 08130567664</p>
          </div>
    
          <p style="line-height: 1.6;">We pray for God's blessings and look forward to seeing you soon.</p>
    
          <p>In Christ,</p>
    
          <p style="font-weight: bold; color: #007bff;">The Apostolic Faith Church &copy; IT Team</p>
        </div>
      </div>
    `;

      const mailOptions = {
        from: process.env.EMAIL,
        to: EMAIL,
        subject,
        html: mailBody,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (error) {
        errors.push({ EMAIL, message: error.message });
      }
    }

    return helper.controllerResult({
      req,
      res,
      statusCode: 200,
      result: { errors },
      message: "Emails sent successfully,",
    });
  } catch (error) {
    return helper.controllerResult({
      req,
      res,
      statusCode: 500,
      result: error,
      message: error.message,
    });
  }
});

module.exports = { sendMailerToMember, sendInvitationToAll };
