import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing-attempt.schema';
import { securityAlertTemplate } from './templates/security-alert.template';
import { passwordResetTemplate } from './templates/password-reset.template';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhishingService {
  private readonly logger = new Logger(PhishingService.name);
  private readonly templates = {
    'security-alert': securityAlertTemplate,
    'password-reset': passwordResetTemplate,
  };

  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(PhishingAttempt.name) private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {}

  async sendPhishingEmail(sendPhishingEmailDto: SendPhishingEmailDto) {
    try {
      this.logger.debug(`Attempting to send email to: ${sendPhishingEmailDto.email}`);
      
      const template = this.templates[sendPhishingEmailDto.template];
      if (!template) {
        throw new Error(`Template ${sendPhishingEmailDto.template} not found`);
      }

      const trackingId = uuidv4();
      const clickUrl = `http://localhost:3000/phishing/click/${trackingId}`;
      
      // Replace the placeholder URL with the tracking URL
      const htmlContent = template.html.replace(
        'http://localhost:5173/verify',
        clickUrl
      ).replace(
        'http://localhost:5173/reset-password',
        clickUrl
      );

      const mailOptions = {
        to: sendPhishingEmailDto.email,
        subject: template.subject,
        html: htmlContent,
      };

      this.logger.debug('Mail options:', mailOptions);
      
      await this.mailerService.sendMail(mailOptions);
      
      // Save successful attempt
      const attempt = await this.phishingAttemptModel.create({
        targetEmail: sendPhishingEmailDto.email,
        template: sendPhishingEmailDto.template,
        status: 'sent',
        sentAt: new Date(),
        trackingId,
        clicked: false,
      });

      this.logger.debug(`Created phishing attempt with ID: ${attempt._id} and trackingId: ${trackingId}`);

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
        trackingId: uuidv4(),
        clicked: false,
      });

      throw new Error(`Failed to send phishing email: ${error.message}`);
    }
  }

  async handleLinkClick(trackingId: string) {
    try {
      this.logger.debug(`Looking for attempt with trackingId: ${trackingId}`);
      
      const attempt = await this.phishingAttemptModel.findOne({ trackingId });
      if (!attempt) {
        this.logger.error(`No attempt found with trackingId: ${trackingId}`);
        throw new Error('Invalid tracking ID');
      }

      this.logger.debug(`Found attempt: ${JSON.stringify(attempt)}`);
      
      attempt.clicked = true;
      const updatedAttempt = await attempt.save();
      
      this.logger.debug(`Updated attempt: ${JSON.stringify(updatedAttempt)}`);

      return {
        success: true,
        message: 'Link click recorded successfully',
        attempt: updatedAttempt,
      };
    } catch (error) {
      this.logger.error('Failed to record link click:', error);
      throw new Error(`Failed to record link click: ${error.message}`);
    }
  }

  async getPhishingAttempts() {
    return this.phishingAttemptModel.find().sort({ createdAt: -1 }).exec();
  }
}
