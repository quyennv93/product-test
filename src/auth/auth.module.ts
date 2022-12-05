import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwrStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy, JwrStrategy],
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.register({ secret: '1993'}),
    PassportModule,
  ],
  exports: [TypeOrmModule,JwtModule]
})
export class AuthModule {}
