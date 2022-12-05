import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import * as bcrypt from 'bcrypt';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountRepository } from './account.repository';
@Injectable()
export class AuthService {
    constructor( 
        @InjectRepository(Account)
        private readonly accountRepo: AccountRepository,
        private readonly jwtService: JwtService,
        ){}
    async hashPassword (password: string): Promise<any> {
        return await bcrypt.hash(password, 12);
    }  
    
    async register (accountDto: CreateAccountDto): Promise<Account> {
        const hasdPassword = await this.hashPassword(accountDto.password);
        return await this.accountRepo.save({ ...accountDto, password: hasdPassword });
    }

    async comparePassword (password: string, hasdPassword: string):Promise <boolean> {
        return await bcrypt.compare(password, hasdPassword);
    }

    async authentication( username: string, password: string): Promise<any> {
        const account = await this.findOneByUserName(username);
        if (account) {
            if (await this.comparePassword(password, account.password)) {
                return account;
            }
        }
        throw new UnauthorizedException();
    }

    async generateToken(payload: Account) {
        
        return await this.jwtService.sign({ id: payload.id, username: payload.username });
    }

    async findOneByUserName(username: string): Promise<Account> {
        return await this.accountRepo.findOne({ where: { username }});
    }

    async findOneById(id: number):Promise<Account> {
        return await this.accountRepo.findOneByIdOrFail(id);
    }

    async findAll() {
        return await this.accountRepo.findAll();
    }

}
