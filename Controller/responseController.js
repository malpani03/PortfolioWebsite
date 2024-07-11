// controllers/responseController.js
const Response = require('../model/Response');
const nodemailer = require('nodemailer');

// Set up nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
const sendThankYouEmail = (recipientEmail, recipientName) => {
  const mailOptions = {
    from: 'Rupesh Malpani <your-email@gmail.com>',
    to: recipientEmail,
    subject: 'Thank You for Connecting with Us!',
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4a4a4a;">Dear ${recipientName},</h2>
          <p>Thank you for reaching out to us! We're thrilled to connect with you and appreciate your interest in our company.</p>
          <p>Our team is reviewing your message and will get back to you as soon as possible, typically within 1-2 business days.</p>
          <p>If you have any urgent questions, please don't hesitate to call us at 8830285514</p>
          <p>We look forward to assisting you!</p>
          <p>Best regards,<br>Rupesh Malpani.</p>
          <hr>
          <p style="font-size: 0.8em; color: #888;">
            This email was sent to ${recipientEmail}. If you didn't request this, please ignore this message.
          </p>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

exports.createResponse = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newResponse = new Response({ name, email, message });
    await newResponse.save();
    
    // Send thank you email
    sendThankYouEmail(email, name);

    res.status(201).json(newResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create response' });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

exports.deleteResponse = async (req, res) => {
  const { id } = req.params;
  try {
    await Response.findByIdAndDelete(id);
    res.status(200).json({ message: 'Response deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete response' });
  }
};
