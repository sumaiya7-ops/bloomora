import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Body() dto: CreateProductDto, @Req() req) {
    return this.productsService.create(dto, req.user.id);
  }

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }
}