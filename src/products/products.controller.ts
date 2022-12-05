import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Product')
@Controller('products')
export class ProductsController {}
