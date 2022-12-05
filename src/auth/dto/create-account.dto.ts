import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { EnumRole } from "src/common/enums/enum.role";

export class CreateAccountDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ enum: EnumRole, default: EnumRole.USER })
    @IsNotEmpty()
    role: EnumRole;
}