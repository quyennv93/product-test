import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { AuthPayload } from "../interface/auth-payload.interface";
@Injectable()
export class JwrStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '1993',
        })
    }

    async validate(payload: AuthPayload): Promise<any> {
        return await this.authService.findOneById(payload.id);
    }
}