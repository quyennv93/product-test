import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AddcardService } from './addcard/addcard.service';
import { AddcardModule } from './addcard/addcard.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'product_demo',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
    username: 'root',
    password: '123456',
    }),
    ProductsModule,
    AddcardModule],
  controllers: [AppController],
  providers: [AppService, AddcardService],
})
export class AppModule {}
