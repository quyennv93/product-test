import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseAbstarctRepository } from "src/base/base-abstract.repository";
import { Repository } from "typeorm";
import { Account } from "./account.entity";

@Injectable()
export class AccountRepository extends BaseAbstarctRepository<Account> {
    private _repository: Repository<Account>;

    constructor(
        @InjectRepository(Account)
        repository: Repository<Account>,
    ) {
        super(repository);
        this._repository = repository;
    }
}