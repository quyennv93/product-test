import { CanActivate, ExecutionContext, flatten, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "src/common/decorators/role";
import { EnumRole } from "src/common/enums/enum.role";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<EnumRole[]>(
            ROLE_KEY,
            [context.getHandler(), context.getClass(),]
        );
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) return false;
        return requiredRoles.some((role)=> user.role.includes(role));
    }
    
}