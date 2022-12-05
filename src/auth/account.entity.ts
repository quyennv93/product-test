import { AddCard } from "src/addcard/addcard.entity";
import { EnumRole } from "src/common/enums/enum.role";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('enum', { enum: EnumRole ,default: EnumRole.USER})
  role: EnumRole;

  @OneToMany(()=> AddCard, (c)=> c.owner, { nullable: true, onDelete:'CASCADE'})
  cards: AddCard[];
}