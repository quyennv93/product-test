import { ApiProperty } from "@nestjs/swagger";

export class ProductId {
    @ApiProperty()
    id: number;
}