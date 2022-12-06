import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Account } from 'src/auth/account.entity';
import { CurrentAcount } from 'src/common/decorators/current-account';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { AddcardService } from './addcard.service';
import { CreateCard } from './dto/create-addcard';
import { ProductId } from './dto/productId';
@ApiTags('AddCard')
@Controller('addcart')
export class AddcardController {
    constructor( private readonly addCardService: AddcardService) {}
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async create(
        @Body() createCard: CreateCard,
        @CurrentAcount() by: Account,
    ) {
        return await this.addCardService.create(createCard, by);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @CurrentAcount() by: Account
    ) {
        return await this.addCardService.delete(id, by)
    }

    @Get('by-account/:id')
    async findOneByAccountId(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.addCardService.findByAccountId(id)
    }

    @Post('addProduct/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async addProductToCard(
        @Param('id', ParseIntPipe) id: number,
        @Body() productId: ProductId,
        @CurrentAcount() by: Account,
    ){
        return await this.addCardService.addProductToCard(id, +productId.id, by)
    }
    @Get(':id')
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.addCardService.findOneById(id);
    }

}
