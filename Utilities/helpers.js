const { APP_MESSAGES } = require("./En");
const { ValidationError } = require('mongoose').Error;
// const { format, parse } = require('date-fns');
const nodemailer = require("nodemailer");


exports.controllerResult = ({ req, res, result, message, statusCode, totalPages }) => {
  if (result instanceof Error) {
    const errorMessage = statusCode
      ? message || result.message
      : APP_MESSAGES.SERVER_ERROR;
    return res.status(statusCode || 500).json({
      status: false,
      message: "Error: " + errorMessage,
      error: result,
    });
  } else {
    return res.status(statusCode || 200).json({
      status: true,
      ...(message ? { message: message } : {}),
      data: result,
      totalPages
    });
  }
};



exports.sendEmailHelper = async (email, subject, mailBody) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject || "Sunday Service Invitation",
      html: mailBody,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully", info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: error.message };
  }
};



