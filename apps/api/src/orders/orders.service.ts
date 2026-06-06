import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(orderData: any, userId: string) {
    const { productId, quantity } = orderData;

    // 1. product find
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // 2. stock check
    if (product.stock < quantity) {
      throw new UnauthorizedException('Not enough stock');
    }

    // 3. stock decrease
    product.stock -= quantity;
    await product.save();

    // 4. create order
    return this.orderModel.create({
      productId,
      buyerId: userId,
      quantity,
      status: 'PENDING',
    });
  }

  async findMyOrders(userId: string) {
    return this.orderModel.find({ buyerId: userId });
  }

  async findAll() {
    return this.orderModel.find();
  }

  async updateStatus(id: string, status: string, user: any) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException('Only admin can update status');
    }

    order.status = status;
    return order.save();
  }
}