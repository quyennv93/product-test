import { AddCard } from "src/addcard/addcard.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => AddCard, (card) => card.products, { onDelete:'CASCADE'})
    cards: AddCard[];
}