import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'tscmis2020@gmail.com',
        pass: 'titunrmoebralrwa',
      },
    });
  }

  async sendMail(body: any) {
    const mailOptions = {
      from: 'msimbazi@gmail.com',
      to: body.email,
      subject: 'Umejisajili kikamilifu',
      html:
        `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign-Up Successful</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; background-color: #f2f2f2; padding: 20px;">

    <div style="background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
        <h1>Welcome to Our Service!</h1>
        <p>Your sign-up was successful.</p>
        <p>Your identification number is:</p>
        <h2 style="color: #007bff;">` +
        body.user_identification +
        `</p>
</h2>
        <p>Thank you for joining our platform. We are excited to have you as a member.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>Your Team</p>
    </div>

</body>
</html>
`, // Use the HTML template above
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Email error: ' + error.message);
      throw error;
    }
  }

  async sendSubmissionMail(body: any) {
    const mailOptions = {
      from: 'msimbazi@gmail.com',
      to: body.email,
      subject: 'Umetuma ujumbe wako kikamilifu',
      html:
        `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Query Submission</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; background-color: #f2f2f2; padding: 20px;">

    <div style="background-color: #fff; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
        <h1>Welcome to Our Service!</h1>
        <p>Your query submission was successful.</p>
        <p>Your query tracking number is:</p>
        <h2 style="color: #007bff;">` +
        body.query.tracknumber +
        `</p>
</h2>
        <p>Thank you for joining our platform. We are excited to have you as a member.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>Your Team</p>
    </div>

</body>
</html>
`, // Use the HTML template above
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Email error: ' + error.message);
      throw error;
    }
  }
}
