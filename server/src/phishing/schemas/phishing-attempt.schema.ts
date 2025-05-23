import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema({ timestamps: true })
export class PhishingAttempt {
  @Prop({ required: true })
  targetEmail: string;

  @Prop({ required: true })
  template: string;

  @Prop({ required: true, enum: ['sent', 'failed'] })
  status: string;

  @Prop()
  errorMessage?: string;

  @Prop()
  sentAt: Date;

  @Prop({ default: false })
  clicked: boolean;

  @Prop({ required: true, unique: true })
  trackingId: string;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt); 