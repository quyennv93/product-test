import { Injectable } from '@nestjs/common';
import { Account } from 'src/auth/account.entity';
import { CreateProduct } from './dto/create-product';
import { ProductRepository } from './product.repository';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    async create ( createProduct: CreateProduct): Promise<Product> {
        return await this.productRepository.save(createProduct);
    }
    async delete(id: number) {
        return await this.productRepository.delete(id);
    }

    async findById(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id }});
    }
}
