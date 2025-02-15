exports.saturdayReminder = (name, location) => `
  <p>Dear ${name},</p>
  <p>This is a gentle reminder about our church service tomorrow morning.</p>
  <ul>
    <li><strong>Children's Sunday School:</strong> 8:30 AM</li>
    <li><strong>Morning Devotional service:</strong> 9:00 AM</li>
    <li><strong>Children's service:</strong> 9:40 AM</li>
    <li><strong>Morning Devotional service:</strong> 9:00 AM</li>
    <li><strong>Evening Revival and Evangelistic service:</strong> 4:30 PM</li>
  </ul>
  <p>Location: ${location}</p>
  <p>God bless you!</p>
`;

exports.sundayMorningReminder = (name, location) => `
  <p>Good morning ${name},</p>
  <p>It's another beautiful day to worship and fellowship together!</p>
  <ul>
    <li><strong>Children's Sunday School:</strong> 8:30 AM</li>
    <li><strong>Morning Devotional service:</strong> 9:00 AM</li>
    <li><strong>Children's service:</strong> 9:40 AM</li>
    <li><strong>Morning Devotional service:</strong> 9:00 AM</li>
    <li><strong>Evening Revival and Evangelistic service:</strong> 4:30 PM</li>
  </ul>
  <p>Location: ${location}</p>
  <p>God bless you abundantly.</p>
`;


exports.scheduleTime = `
  <table class="schedule" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr style="background-color: #007bff; color: white;">
        <th style="padding: 10px; text-align: left;">Event</th>
        <th style="padding: 10px; text-align: left;">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Children's Sunday School</strong></td>
        <td style="padding: 10px; text-align: left;">8:30 AM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Morning service</strong></td>
        <td style="padding: 10px; text-align: left;">9:00 AM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Children's Service</strong></td>
        <td style="padding: 10px; text-align: left;">9:40 AM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Morning Devotional service</strong></td>
        <td style="padding: 10px; text-align: left;">10:45 AM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Evening Revival and Evangelistic service</strong></td>
        <td style="padding: 10px; text-align: left;">4:30 PM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Morning Prayer (Monday - Saturday)</strong></td>
        <td style="padding: 10px; text-align: left;">5:30 AM - 6:00 AM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Evening Prayer (Tuesday & Thursday)</strong></td>
        <td style="padding: 10px; text-align: left;">6:00 PM - 8:00 PM</td>
      </tr>
      <tr style="border: 1px solid #ddd;">
        <td style="padding: 10px; text-align: left;"><strong>Bible study (Wednesday)</strong></td>
        <td style="padding: 10px; text-align: left;">6:00 PM - 8:00 PM</td>
      </tr>
    </tbody>
  </table>
`;
