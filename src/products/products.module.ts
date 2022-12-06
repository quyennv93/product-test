import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { ProductsController } from './products.controller';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService,ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
  exports:[ProductsService,TypeOrmModule]
})
export class ProductsModule {}
