import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [PhishingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
