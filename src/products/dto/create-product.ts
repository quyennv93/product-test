import { ApiProperty } from "@nestjs/swagger";

export class CreateProduct {
    @ApiProperty({example: 'iphone'})
    name: string;
}