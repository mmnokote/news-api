// email-consumer.service.ts

import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
import { EmailService } from 'src/mail.service';

@Injectable()
export class EmailConsumerService {
  private readonly queue = 'email_queue';
  constructor(private readonly emailService: EmailService) {}

  async consume() {
    try {
      // const connection = await amqp.connect('amqp://localhost');
      const connection = await amqp.connect(
        'amqp://rabbitmq:Passw0rd123@172.16.18.166:5672',
      );

      const channel = await connection.createChannel();

      await channel.assertQueue(this.queue, { durable: true });
      await channel.prefetch(1);

      console.log(
        `[*] Waiting for messages in ${this.queue}. To exit press CTRL+C`,
      );

      channel.consume(this.queue, async (msg) => {
        if (msg !== null) {
          try {
            const message = JSON.parse(msg.content.toString());
            await this.sendEmail(message);
            console.log(`[x] Sent email to ${message.email}`);
          } catch (error) {
            console.error('[!] Error processing message:', error.message);
          } finally {
            channel.ack(msg);
          }
        }
      });
    } catch (error) {
      console.error('[!] Error connecting to RabbitMQ:', error.message);
    }
  }

  async sendEmail(body: any) {
    await this.emailService.sendPaymentEmail(body);

    // Add your email sending logic here
    console.log(`Sending email to ${body.email}`);
    // Example using nodemailer to send email
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });
  }
}
