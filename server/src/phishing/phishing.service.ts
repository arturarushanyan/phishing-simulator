import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Injectable()
export class PhishingService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPhishingEmail(sendPhishingEmailDto: SendPhishingEmailDto) {
    try {
      await this.mailerService.sendMail({
        to: sendPhishingEmailDto.email,
        subject: 'Important: Action Required',
        template: sendPhishingEmailDto.template,
        context: {
          // Add any dynamic content here
          name: 'User',
        },
      });

      return {
        success: true,
        message: 'Phishing email sent successfully',
      };
    } catch (error) {
      throw new Error(`Failed to send phishing email: ${error.message}`);
    }
  }
}
