// twilio.service.ts
import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';
import twilioConfig from './twilio.gonfig';

@Injectable()
export class TwilioService {
  private twilioClient: twilio.Twilio;

  constructor() {
    this.twilioClient = twilio(
      twilioConfig.twilioAccountSid,
      twilioConfig.twilioAuthToken,
    );
  }

  async sendSms(to: string, message: string) {
    try {
      await this.twilioClient.messages.create({
        body: message,
        from: twilioConfig.twilioPhoneNumber,
        to: '+255766148716',
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  }
}
