const cron = require("node-cron");
const nodemailer = require("nodemailer");
const User = require("../Models/userModel");
const { scheduleTime } = require("../Utilities/emailTemplate");
require("dotenv").config();
// import { Axios } from "axios";
const axios = require("axios");


// Configure transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send emails
const sendWeeklyEmails = async (subject, message) => {
  try {
    console.log("Running weekly email job...");

    // Fetch user emails and names from the database
    const users = await User.find({});
    if (users.length === 0) {
      console.log("No recipients found in the database.");
      return;
    }

    for (const user of users) {
      const { email, fullname } = user; // Destructure to get name and address

      // Personalize the email content with the user's name and address
      const personalizedMessage = message.replace("${fullname}", fullname);

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: personalizedMessage,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      console.log(`Weekly email sent to ${fullname} (${email}) successfully.`);
    }
  } catch (error) {
    console.error("Error sending weekly emails:", error);
  }
};

// Cron job for Saturday at 8 PM
cron.schedule("0 20 * * 6", () => {
  const subject = "Saturday Evening Reminder";
  const message = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
        <h2 style="text-align: center; color: #007bff;">Sunday Service Invitation</h2>

        <p>Dear <strong>\${fullname}</strong>,</p>

        <p>We warmly remind you to join us for our Sunday service tomorrow. Here’s the schedule:</p>
        \${scheduleTime}

        <p style="line-height: 1.6;">We are looking forward to worshiping with you and growing together in faith. Your presence would be a blessing to us!</p>

        <div style="border-top: 2px solid #007bff; padding-top: 20px; margin-top: 20px;">
          <p><strong>Location:</strong> @ B4, Plot 456, Obafemi Awolowo/Mike Akigbe Way, by Apostolic Faith Bus Stop, Jabi, Abuja</p>
          <p><strong>Date:</strong> This Sunday</p>
          <p><strong>Contact:</strong> apostolicfaithjabi@gmail.com | 08130567664</p>
        </div>

        <p style="line-height: 1.6;">We pray for God's blessings and look forward to seeing you soon.</p>

        <p>In Christ,</p>

        <p style="font-weight: bold; color: #007bff;">The Apostolic Faith Church &copy; IT Team</p>
      </div>
    </div>
  `;
  sendWeeklyEmails(subject, message);
});

// Cron job for Sunday at 7 AM
cron.schedule("0 7 * * 0", () => {
  const subject = "Sunday Morning Reminder";
  const message = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
        <h2 style="text-align: center; color: #007bff;">Sunday Service Invitation</h2>

        <p>Dear <strong>\${fullname}</strong>,</p>

        <p>Good morning! We warmly remind you to join us for our Sunday service tomorrow. Here’s the schedule:</p>
        \${scheduleTime}

        <p style="line-height: 1.6;">We are looking forward to worshiping with you and growing together in faith. Your presence would be a blessing to us!</p>

        <div style="border-top: 2px solid #007bff; padding-top: 20px; margin-top: 20px;">
          <p><strong>Location:</strong> @ B4, Plot 456, Obafemi Awolowo/Mike Akigbe Way, by Apostolic Faith Bus Stop, Jabi, Abuja</p>
          <p><strong>Date:</strong> This Sunday</p>
          <p><strong>Contact:</strong> apostolicfaithjabi@gmail.com | 08130567664</p>
        </div>

        <p style="line-height: 1.6;">We pray for God's blessings and look forward to seeing you soon.</p>

        <p>In Christ,</p>

        <p style="font-weight: bold; color: #007bff;">The Apostolic Faith Church &copy; IT Team</p>
      </div>
    </div>
  `;
  sendWeeklyEmails(subject, message);
});

// cron.schedule("* * * * *", () => {
//   const subject = "Sunday Morning Reminder";
//   const message = `
//     <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
//       <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
//         <h2 style="text-align: center; color: #007bff;">Sunday Service Invitation</h2>

//         <p>Dear <strong>\${fullname}</strong>,</p>

//         <p>Good morning! We warmly remind you to join us for our Sunday service tomorrow. Here’s the schedule:</p>
//         \${scheduleTime}

//         <p style="line-height: 1.6;">We are looking forward to worshiping with you and growing together in faith. Your presence would be a blessing to us!</p>

//         <div style="border-top: 2px solid #007bff; padding-top: 20px; margin-top: 20px;">
//           <p><strong>Location:</strong> @ B4, Plot 456, Obafemi Awolowo/Mike Akigbe Way, by Apostolic Faith Bus Stop, Jabi, Abuja</p>
//           <p><strong>Date:</strong> This Sunday</p>
//           <p><strong>Contact:</strong> apostolicfaithjabi@gmail.com | 08130567664</p>
//         </div>

//         <p style="line-height: 1.6;">We pray for God's blessings and look forward to seeing you soon.</p>

//         <p>In Christ,</p>

//         <p style="font-weight: bold; color: #007bff;">The Apostolic Faith Church &copy; IT Team</p>
//       </div>
//     </div>
//   `;
//   sendWeeklyEmails(subject, message);
// });


cron.schedule("* * * * *", async () => {
  try {
    const baseUrl =
      process.env.ENV === "local"
        ? `${process.env.BASE_URL}:${process.env.PORT}`
        : `${process.env.BASE_URL}`;

    const api = axios.create({ baseURL: baseUrl });

    const response = await api.get("/healthz");
    console.log("Health check successful:", response.data);
  } catch (error) {
    console.error("Health check failed:", error.message);
  }
}); 

module.exports = () => {
  console.log("Cron jobs initialized.");
};
