import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
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
    this.logger.debug(`Received click for trackingId: ${trackingId}`);
    const result = await this.phishingService.handleLinkClick(trackingId);
    this.logger.debug(`Click handling result: ${JSON.stringify(result)}`);
    return result;
  }

  @Get('attempts')
  async getPhishingAttempts() {
    return this.phishingService.getPhishingAttempts();
  }
}
