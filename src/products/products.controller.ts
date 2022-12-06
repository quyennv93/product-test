import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enums/enum.role';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { CreateProduct } from './dto/create-product';
import { ProductsService } from './products.service';

@ApiTags('Product')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}
    @Post()
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(EnumRole.ADMIN)
    @ApiBearerAuth()
    async create(
        @Body() createProduct: CreateProduct
    ){
        return await this.productService.create(createProduct)
    }
    @Delete(':id')
    @UseGuards(JwtAuthGuard,RoleGuard)
    @Roles(EnumRole.ADMIN)
    @ApiBearerAuth()
    async delete(
        @Param('id',ParseIntPipe) id: number
    ){
        return await this.productService.delete(id)
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseIntPipe) id: number
    ){
        return await this.productService.findById(id);
    }
    @Get()
    async findAll(){
        return await this.productService.findAll();
    }
}
