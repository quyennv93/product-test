import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstarctRepository } from "src/base/base-abstract.repository";
import { Repository } from "typeorm";
import { Product } from "./products.entity";


@Injectable()
export class ProductRepository extends BaseAbstarctRepository<Product> {
    private _repository: Repository<Product>;

    constructor(
        @InjectRepository(Product)
        repository: Repository<Product>,
    ) {
        super(repository);
        this._repository = repository;
    }
}