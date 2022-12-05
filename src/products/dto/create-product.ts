import { ApiProperty } from "@nestjs/swagger";

export class CreateProduct {
    @ApiProperty()
    name: string;
}