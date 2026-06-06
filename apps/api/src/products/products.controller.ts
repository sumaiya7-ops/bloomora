import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: any,
    @Req() req,
  ) {
    return this.productsService.update(id, updateProductDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string, @Req() req) {
    return this.productsService.remove(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
@Get('my')
getMyProducts(@Req() req) {
  return this.productsService.findBySeller(req.user.id);
}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProduct(@Body() dto: any, @Req() req) {
    const userId = req.user?.id || req.user?.sub;

    return this.productsService.create(dto, userId);
  }

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }
}
