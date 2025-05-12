import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT as string, 10) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  from: process.env.SMTP_FROM,
})); 