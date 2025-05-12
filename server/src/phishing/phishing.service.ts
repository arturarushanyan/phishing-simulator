import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Injectable()
export class PhishingService {
  private readonly logger = new Logger(PhishingService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendPhishingEmail(sendPhishingEmailDto: SendPhishingEmailDto) {
    try {
      this.logger.debug(`Attempting to send email to: ${sendPhishingEmailDto.email}`);
      
      const mailOptions = {
        to: sendPhishingEmailDto.email,
        subject: 'Important: Action Required',
        template: sendPhishingEmailDto.template,
        context: {
          name: 'User',
        },
      };

      this.logger.debug('Mail options:', mailOptions);
      
      await this.mailerService.sendMail(mailOptions);
      
      this.logger.debug('Email sent successfully');
      return {
        success: true,
        message: 'Phishing email sent successfully',
      };
    } catch (error) {
      this.logger.error('Failed to send email:', error);
      throw new Error(`Failed to send phishing email: ${error.message}`);
    }
  }
}
