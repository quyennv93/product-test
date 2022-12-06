import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { AddcardController } from './addcard.controller';
import { AddCard } from './addcard.entity';
import { AddCardRepository } from './addcard.repository';
import { AddcardService } from './addcard.service';

@Module({
  controllers: [AddcardController],
  providers:[AddcardService,AddCardRepository],
  exports:[TypeOrmModule, AddcardService],
  imports:[TypeOrmModule.forFeature([AddCard]),ProductsModule]
})
export class AddcardModule {}
