import { Account } from "src/auth/account.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('addcard')
export class AddCard {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToOne(()=> Account, (owner) => owner.cards)
    owner: Account;
    @ManyToMany(()=> Product, (p)=> p.cards, { cascade: true, eager: true})
    @JoinTable({ name: 'card_product'})
    products: Product[];
}