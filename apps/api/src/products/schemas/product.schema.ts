import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  stock: number;

  @Prop()
  image: string;

  @Prop({ default: 'ACTIVE' })
  status: string;

  @Prop({ required: true })
  createdBy: string; // admin/seller id
}

export const ProductSchema = SchemaFactory.createForClass(Product);