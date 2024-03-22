import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'iphcctamisemi@gmail.com',
        pass: 'pqklorpcrfgihukt',
        // user: 'tscmis2020@gmail.com',
        // pass: 'titunrmoebralrwa',
      },
    });
  }

  async sendNormalEmail(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'Email from IPHCC',
      html:
        `
      <html>
<body>
<p>Dear User,</p>
<p>
Thank you for registering with our system:
</p>
<p>
<p><strong>` +
        body.comment +
        `</strong></p>
</p>
<p>Thank you for joining our platform. We are excited to have you as a member.</p>
<p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
<p><a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank" style="text-decoration: none; color: #007bff;">Click here to log in</a></p>
<p>Best regards,<br>Your Team</p>
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
  async sendPaymentEmail(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'IPHC 2024 Welcoming',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcoming</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: left; background-color: #f2f2f2; padding: 20px;">
      
          <h2>Subject: IPHC 2024 Invitation to Participate</h2>
      
          <p>Dear Participant,</p>
          <p>Thank you for registering for the International Primary Healthcare Conference (IPHC 2024) in Dodoma. We are excited to have you join us for this event.</p>
          <p>The conference will be held from March 25th to 27th, 2024, at the Jakaya Kikwete Convention Center in Dodoma, Tanzania.</p>
      
          <p>Don't forget to download the QR code <span style="color: red;">from your registered account in the system</span> and bring it with you, either printed or on your phone, to the conference.</p>

          <p>We look forward to welcoming you to Dodoma next week.</p>
          <p>Regards,<br>IPHC Secretariat</p>
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
  async sendPaymentEmail2(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'Payment Reminder from IPHCC',
      html: `
        <html>
        <body>
        <p>Dear User,</p>
        <p>
        Thank you for registering with our system:
        </p>
        
        Please follow these steps to complete your registration:
        </p>
        <ol>
          <li>Login to your account on our system.</li>
          <li>Print an invoice from your profile.</li>
          <li>Make a payment corresponding to the registration category you selected.</li>
          <li>Upload the payment receipt from your bank to our system.</li>
        </ol>
        <p>Thank you for joining our platform. We are excited to have you as a member.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p><a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank" style="text-decoration: none; color: #007bff;">Click here to log in</a></p>
        <p>Best regards,<br>Your Team</p>
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

  async sendAbstarctApprovalEmailR(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'Abstract Submission Feedback',
      html: `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rejection Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: left; background-color: #f2f2f2; padding: 20px;">
        
            <h2>Subject: IPHC 2024 Abstract Update & Invitation to Participate</h2>
            <p>Dear User,</p>
            <p>Thank you for submitting your abstract to the International Primary Healthcare Conference (IPHC 2024) in Dodoma. The review process was highly competitive, and we received many excellent submissions.</p>
            <p>While your abstract was not selected for presentation this year, we were very impressed with your work. We apologize for the misunderstanding caused by an error in our system, which may have indicated that your abstract was accepted.</p>
            <p>We encourage you to register and attend IPHC 2024 at the Jakaya Kikwete Convention Center from March 25th to 27th. It will be a fantastic opportunity to learn from leading experts, network with colleagues, and stay updated on advancements in primary healthcare in Tanzania.</p>
            <p><strong>Registration:</strong> To register, please visit our online portal <a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank"><a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank" style="text-decoration: none; color: #007bff;">Click here to log in</a></a>.</p>
            <p>Should you encounter any difficulties with registration, please don't hesitate to contact us: +25686697117 or +255784985240</p>
            <p>We look forward to welcoming you to Dodoma next week</p>
            <p>Regards,<br>IPHC Secretariat</p>
        
        </body>
        </html>
        
        
`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Email error: ' + error.message);
      throw error;
    }
  }

  async sendAbstarctApprovalEmailA(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'Abstract Submission Feedback',
      html:
        `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>IPHC 2024 Abstract Update & Invitation to Participate</title>
        </head>
        <body style="font-family: Arial, sans-serif; text-align: left; background-color: #f2f2f2; padding: 20px;">
        
            <h2>Subject: Congratulations! Your Abstract for IPHC 2024 Has Been Accepted!</h2>
            <p>Dear Applicant,</p>
            <p>We are delighted to inform you that your abstract, ` +
        body.title +
        `, has been selected for presentation at the International Primary Healthcare Conference (IPHC 2024)!</p>
            <p>The conference will be held from March 25th to 27th, 2024, at the Jakaya Kikwete Convention Center in Dodoma, Tanzania.</p>
            <p>To ensure a smooth presentation;</p>
            <ul>
                <li>Please upload your PowerPoint presentation (PPT) to the registration portal by 8:00 PM on Friday, March 22nd, 2024. To access the required presentation format, <a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank">please log in to your portal</a> account and download the attached sample documents in the "My Abstract Menu"</li>
                <li>We highly recommend registering for the conference if you haven't already. You can do so through our online portal, <a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank">HERE</a>.</li>
                <li>If you are unable to attend the conference, kindly inform us as soon as possible.</li>
            </ul>
            <p>Also, your abstract will be published in the Pan African Medical Journal (PAMJ). To facilitate this, we kindly request you send us your abstract to iphcctamisemi@gmail.com in a Word document addressing reviewers comments (If any) and format your abstract in accordance to guideline attached in the portal by 8:00 PM on Friday, 22 and March 2023.</p>
            <p>For any inquiries or assistance.</p>
            <ul>
                <li>Registration: +25686697117 or +255784985240</li>
                <li>Abstract-related issues: +255687756470</li>
            </ul>
            <p>We look forward to welcoming you to Dodoma and your insightful presentation at IPHC 2024!</p>
            <p>Regards,<br>IPHC Secretariat</p>
        
        </body>
        </html>
        
`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Email error: ' + error.message);
      throw error;
    }
  }

  async sendMail(body: any) {
    const mailOptions = {
      from: 'tamisemi.go.tz',
      to: body.email,
      subject: 'Password Recovery',
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
                <p>Your password restoration was successful.</p>
                <p>Your password is:</p>
                <h2 style="color: #007bff;">` +
        body.comment +
        `</p>
        </h2>
                <p>Thank you for joining our platform. We are excited to have you as a member.</p>
                <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                <p><a href="https://iphcconference.tamisemi.go.tz/authentication" target="_blank" style="text-decoration: none; color: #007bff;">Click here to log in</a></p>
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
