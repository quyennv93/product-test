import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstarctRepository } from "src/base/base-abstract.repository";
import { Repository } from "typeorm";
import { AddCard } from "./addcard.entity";

@Injectable()
export class AddCardRepository extends BaseAbstarctRepository<AddCard> {
    private _repository: Repository<AddCard>;

    constructor(
        @InjectRepository(AddCard)
        repository: Repository<AddCard>,
    ) {
        super(repository);
        this._repository = repository;
    }
}