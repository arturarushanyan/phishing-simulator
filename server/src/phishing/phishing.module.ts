import { Module } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import emailConfig from '../config/email.config';
import { PhishingAttempt, PhishingAttemptSchema } from './schemas/phishing-attempt.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema }
    ], 'phishing'),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = {
          transport: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: configService.get('email.auth.user'),
              pass: configService.get('email.auth.pass'),
            },
            tls: {
              rejectUnauthorized: false
            }
          },
          defaults: {
            from: configService.get('email.from'),
          },
        };
        console.log('Mailer config:', {
          ...config,
          transport: {
            ...config.transport,
            auth: {
              user: config.transport.auth.user,
              pass: '***' // masked for security
            }
          }
        });
        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PhishingService],
  controllers: [PhishingController]
})
export class PhishingModule {}
