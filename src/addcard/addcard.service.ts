import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Account } from 'src/auth/account.entity';
import { ProductsService } from 'src/products/products.service';
import { AddCard } from './addcard.entity';
import { AddCardRepository } from './addcard.repository';
import { CreateCard } from './dto/create-addcard';

@Injectable()
export class AddcardService {
    constructor(
        private readonly addcardRepo : AddCardRepository,
        private readonly productService: ProductsService,
    ) {}

    async create(createCard: CreateCard, by: Account):Promise<AddCard> {
        if (by) {
            const newCard = await this.addcardRepo.create({ ...createCard, owner: by})
            return await this.addcardRepo.save(newCard);
        }

        throw new UnauthorizedException();
    }

    async delete( id: number,by: Account) {
        const currentCard = this.addcardRepo.findOneByIdOrFail(id);
        if (!currentCard) {
            throw new NotFoundException('noy found');
        }

        const isOwner = (await currentCard).owner.id === by.id;
        if (isOwner) {
            return this.addcardRepo.delete({ id });
        }
         throw new UnauthorizedException();
    }

    async addProductToCard (id: number, productId: number, by: Account) {
        const currentCard = await this.addcardRepo.findOneByIdOrFail(id);
        if (currentCard.owner.id === by.id) {
           const product = await this.productService.findById(productId)
           if (!product) {
            throw new NotFoundException('not found product');
           }
           currentCard.products.push(product);
           return await this.addcardRepo.save(currentCard);
        }
    }
}
