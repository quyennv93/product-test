import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentAcount } from 'src/common/decorators/current-account';
import { Roles } from 'src/common/decorators/role';
import { EnumRole } from 'src/common/enums/enum.role';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Account } from './account.entity';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';
@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    register(@Body() accountDto: CreateAccountDto) {
        return this.authService.register(accountDto);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    @UsePipes(ValidationPipe)
    login(
        @Body() loginDto: LoginAccountDto,
        @CurrentAcount() account: Account,
    ) {
        return this.authService.generateToken(account);
    }

    @Get('accounts')
    @Roles(EnumRole.ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    findAll() {
        return this.authService.findAll();
    }
}
