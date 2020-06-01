import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class History extends Document {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  amount: number;

  @Prop()
  response: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
