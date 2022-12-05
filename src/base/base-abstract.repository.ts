import { FindOneOptions, Repository } from "typeorm";

export abstract class BaseAbstarctRepository<T> extends Repository<T> {
    private repository: Repository<T>;
    protected constructor(repository: Repository<T>) {
        super(repository.target, repository.manager, repository.queryRunner);
        this.repository = repository;
    }

    public async findOne(options: FindOneOptions<T>): Promise<T> {
        return this.repository.findOne(options);
    }

    public async findOneByIdOrFail(id: number | string): Promise<T> {
        const condition = {
            where: {
                id: id,
            },
        } as FindOneOptions;
        return this.repository.findOneOrFail(condition);
    }

    public async findAll(): Promise<T[]> {
        return await this.repository.find();
    }
}