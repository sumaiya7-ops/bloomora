import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // CREATE ORDER
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() dto: any, @Req() req) {
    const userId = req.user.id || req.user.sub;
    return this.ordersService.create(dto, userId);
  }

  // MY ORDERS
  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyOrders(@Req() req) {
    const userId = req.user.id || req.user.sub;
    return this.ordersService.findMyOrders(userId);
  }

  // ALL ORDERS (ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllOrders() {
    return this.ordersService.findAll();
  }
}