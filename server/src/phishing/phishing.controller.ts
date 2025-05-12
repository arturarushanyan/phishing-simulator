import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async sendPhishingEmail(@Body() sendPhishingEmailDto: SendPhishingEmailDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingEmailDto);
  }

  @Get('click/:trackingId')
  async handleLinkClick(@Param('trackingId') trackingId: string) {
    return this.phishingService.handleLinkClick(trackingId);
  }

  @Get('attempts')
  async getPhishingAttempts() {
    return this.phishingService.getPhishingAttempts();
  }
}
