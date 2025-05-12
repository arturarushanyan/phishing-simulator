import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing-attempt.schema';

@Injectable()
export class PhishingService {
  private readonly logger = new Logger(PhishingService.name);

  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(PhishingAttempt.name) private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {}

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
      
      // Save successful attempt
      await this.phishingAttemptModel.create({
        targetEmail: sendPhishingEmailDto.email,
        template: sendPhishingEmailDto.template,
        status: 'sent',
        sentAt: new Date(),
      });

      this.logger.debug('Email sent successfully');
      return {
        success: true,
        message: 'Phishing email sent successfully',
      };
    } catch (error) {
      this.logger.error('Failed to send email:', error);

      // Save failed attempt
      await this.phishingAttemptModel.create({
        targetEmail: sendPhishingEmailDto.email,
        template: sendPhishingEmailDto.template,
        status: 'failed',
        errorMessage: error.message,
        sentAt: new Date(),
      });

      throw new Error(`Failed to send phishing email: ${error.message}`);
    }
  }

  async getPhishingAttempts() {
    return this.phishingAttemptModel.find().sort({ createdAt: -1 }).exec();
  }
}
