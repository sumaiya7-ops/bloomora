import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async create(orderData: any, userId: string) {
    return this.orderModel.create({
      ...orderData,
      buyerId: userId,
    });
  }

  async findMyOrders(userId: string) {
    return this.orderModel.find({ buyerId: userId });
  }

  async findAll() {
    return this.orderModel.find();
  }
}