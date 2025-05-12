import { Controller, Post, Body, Get, Param, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Controller('phishing')
export class PhishingController {
  private readonly logger = new Logger(PhishingController.name);

  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async sendPhishingEmail(@Body() sendPhishingEmailDto: SendPhishingEmailDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingEmailDto);
  }

  @Get('click/:trackingId')
  async handleLinkClick(@Param('trackingId') trackingId: string) {
    try {
      this.logger.debug(`Received click for trackingId: ${trackingId}`);
      const result = await this.phishingService.handleLinkClick(trackingId);
      this.logger.debug(`Click handling result: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error handling click for trackingId ${trackingId}:`, error);
      throw new HttpException(
        error.message || 'Failed to handle link click',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('attempts')
  async getPhishingAttempts() {
    return this.phishingService.getPhishingAttempts();
  }
}
