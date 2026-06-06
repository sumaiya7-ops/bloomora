import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  buyerId: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);