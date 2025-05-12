import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhishingModule } from './phishing/phishing.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'users',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: 'phishing-simulation',
      connectionName: 'phishing',
    }),
    PhishingModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
