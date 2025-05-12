import { Controller, Post, Body } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  async sendPhishingEmail(@Body() sendPhishingEmailDto: SendPhishingEmailDto) {
    return this.phishingService.sendPhishingEmail(sendPhishingEmailDto);
  }
}
