import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

async create(createProductDto: CreateProductDto, userId: string) {
  const product = await this.productModel.create({
    ...createProductDto,
    createdBy: userId,
    sellerId: userId,
  });

  return product;
}

  async findAll() {
    return this.productModel.find();
  }
}
