import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async findBySeller(sellerId: string) {
    return this.productModel.find({ sellerId });
  }

  async findAll() {
    return this.productModel.find();
  }

  async create(createProductDto: CreateProductDto, userId: string) {
    const product = await this.productModel.create({
      ...createProductDto,
      createdBy: userId,
      sellerId: userId,
    });

    return product;
  }

  async update(id: string, updateData: any, user: any) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (
      product.sellerId.toString() !== user.id &&
      user.role !== 'ADMIN'
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
  }

  async remove(id: string, user: any) {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (
      product.sellerId.toString() !== user.id &&
      user.role !== 'ADMIN'
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.productModel.findByIdAndDelete(id);
  }
}