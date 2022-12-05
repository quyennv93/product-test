import { ApiProperty } from "@nestjs/swagger";

export class CreateCard {
    @ApiProperty()
    name: string;
}